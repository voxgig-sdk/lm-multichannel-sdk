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

func TestSelfAdminEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SelfAdmin(nil)
		if ent == nil {
			t.Fatal("expected non-nil SelfAdminEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := self_adminBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "self_admin." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		selfAdminRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.self_admin", setup.data)))
		var selfAdminRef01Data map[string]any
		if len(selfAdminRef01DataRaw) > 0 {
			selfAdminRef01Data = core.ToMapAny(selfAdminRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = selfAdminRef01Data

		// UPDATE
		selfAdminRef01Ent := client.SelfAdmin(nil)
		selfAdminRef01DataUp0Up := map[string]any{
		}

		selfAdminRef01ResdataUp0Result, err := selfAdminRef01Ent.Update(selfAdminRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		selfAdminRef01ResdataUp0 := core.ToMapAny(entityData(selfAdminRef01ResdataUp0Result))
		if selfAdminRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

	})
}

func self_adminBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "self_admin", "SelfAdminTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read self_admin test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse self_admin test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"self_admin01", "self_admin02", "self_admin03"},
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
	entidEnvRaw := os.Getenv("LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID": idmap,
		"LM_MULTICHANNEL_TEST_LIVE":      "FALSE",
		"LM_MULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LM_MULTICHANNEL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LM_MULTICHANNEL_TEST_SELF_ADMIN_ENTID"])
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
