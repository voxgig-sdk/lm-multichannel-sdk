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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const messageEntityLiveStrict = true


func TestMessageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Message(nil)
		if ent == nil {
			t.Fatal("expected non-nil MessageEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Message(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.LmMultichannelError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := messageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "message." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client

		// CREATE
		messageRef01Ent := client.Message(nil)
		messageRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "message"}), "message_ref01"))

		messageRef01DataResult, err := messageRef01Ent.Create(messageRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		messageRef01Data = core.ToMapAny(entityData(messageRef01DataResult))
		if messageRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if messageRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		messageRef01MatchDt0 := map[string]any{
			"id": messageRef01Data["id"],
		}
		messageRef01DataDt0Loaded, err := messageRef01Ent.Load(messageRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		messageRef01DataDt0LoadResult := core.ToMapAny(entityData(messageRef01DataDt0Loaded))
		if messageRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if messageRef01DataDt0LoadResult["id"] != messageRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		messageRef01MatchRm0 := map[string]any{
			"id": messageRef01Data["id"],
		}
		_, err = messageRef01Ent.Remove(messageRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func messageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "message", "MessageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read message test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse message test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"message01", "message02", "message03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_MULTICHANNEL_TEST_MESSAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_MULTICHANNEL_TEST_MESSAGE_ENTID": idmap,
		"LM_MULTICHANNEL_TEST_LIVE":      "FALSE",
		"LM_MULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LM_MULTICHANNEL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_MULTICHANNEL_TEST_MESSAGE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LM_MULTICHANNEL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LM_MULTICHANNEL_APIKEY"],
			},
			extraOpts,
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
