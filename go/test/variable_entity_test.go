package sdktest

import (
	"encoding/json"
	"fmt"
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
const variableEntityLiveStrict = true


func TestVariableEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Variable(nil)
		if ent == nil {
			t.Fatal("expected non-nil VariableEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Variable(nil).List(map[string]any{"template_id": 1}, nil)
		if sdkerr, ok := err.(*core.LmMultichannelError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := variableBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "variable." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"template01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, variableEntityLiveStrict, "Live entity test blocked: needs %s via LM_MULTICHANNEL_TEST_VARIABLE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client

		// CREATE
		variableRef01Ent := client.Variable(nil)
		variableRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "variable"}), "variable_ref01"))
		variableRef01Data["template_id"] = setup.idmap["template01"]

		variableRef01DataResult, err := variableRef01Ent.Create(variableRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		variableRef01Data = core.ToMapAny(entityData(variableRef01DataResult))
		if variableRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		variableRef01Match := map[string]any{
			"template_id": setup.idmap["template01"],
		}

		variableRef01ListResult, err := variableRef01Ent.List(variableRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, variableRef01ListOk := variableRef01ListResult.([]any)
		if !variableRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", variableRef01ListResult)
		}

		// UPDATE
		variableRef01DataUp0Up := map[string]any{
		}

		variableRef01MarkdefUp0Name := "description"
		variableRef01MarkdefUp0Value := fmt.Sprintf("Mark01-variable_ref01_%d", setup.now)
		variableRef01DataUp0Up[variableRef01MarkdefUp0Name] = variableRef01MarkdefUp0Value

		variableRef01ResdataUp0Result, err := variableRef01Ent.Update(variableRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		variableRef01ResdataUp0 := core.ToMapAny(entityData(variableRef01ResdataUp0Result))
		if variableRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if variableRef01ResdataUp0[variableRef01MarkdefUp0Name] != variableRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", variableRef01MarkdefUp0Name, variableRef01ResdataUp0[variableRef01MarkdefUp0Name])
		}

	})
}

func variableBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "variable", "VariableTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read variable test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse variable test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"variable01", "variable02", "variable03", "template01", "template02", "template03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_MULTICHANNEL_TEST_VARIABLE_ENTID": idmap,
		"LM_MULTICHANNEL_TEST_LIVE":      "FALSE",
		"LM_MULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LM_MULTICHANNEL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_MULTICHANNEL_TEST_VARIABLE_ENTID"])
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
