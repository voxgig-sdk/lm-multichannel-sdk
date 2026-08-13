package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/lm-multichannel-sdk/go"
	"github.com/voxgig-sdk/lm-multichannel-sdk/go/core"

	vs "github.com/voxgig-sdk/lm-multichannel-sdk/go/utility/struct"
)

func TestContentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Content(nil)
		if ent == nil {
			t.Fatal("expected non-nil ContentEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := contentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "content." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_CONTENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		contentRef01Ent := client.Content(nil)
		contentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "content"}, setup.data), "content_ref01"))
		contentRef01Data["template_id"] = setup.idmap["template01"]

		contentRef01DataResult, err := contentRef01Ent.Create(contentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		contentRef01Data = core.ToMapAny(entityData(contentRef01DataResult))
		if contentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		contentRef01MatchDt0 := map[string]any{}
		contentRef01DataDt0Loaded, err := contentRef01Ent.Load(contentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if contentRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func contentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "content", "ContentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read content test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse content test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"content01", "content02", "content03", "template01", "template02", "template03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LM_MULTICHANNEL_TEST_CONTENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_MULTICHANNEL_TEST_CONTENT_ENTID": idmap,
		"LM_MULTICHANNEL_TEST_LIVE":      "FALSE",
		"LM_MULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LM_MULTICHANNEL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LM_MULTICHANNEL_TEST_CONTENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LM_MULTICHANNEL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLmMultichannelSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LM_MULTICHANNEL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
