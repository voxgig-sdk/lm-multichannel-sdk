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

func TestVariableEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Variable(nil)
		if ent == nil {
			t.Fatal("expected non-nil VariableEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"variable": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Variable(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Variable(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_MULTICHANNEL_TEST_VARIABLE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		variableRef01Ent := client.Variable(nil)
		variableRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "variable"}, setup.data), "variable_ref01"))
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
	idmap := vs.Transform(
		[]any{"variable01", "variable02", "variable03", "template01", "template02", "template03"},
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
	entidEnvRaw := os.Getenv("LM_MULTICHANNEL_TEST_VARIABLE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_MULTICHANNEL_TEST_VARIABLE_ENTID": idmap,
		"LM_MULTICHANNEL_TEST_LIVE":      "FALSE",
		"LM_MULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LM_MULTICHANNEL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LM_MULTICHANNEL_TEST_VARIABLE_ENTID"])
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
