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

func TestTemplateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Template(nil)
		if ent == nil {
			t.Fatal("expected non-nil TemplateEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"template": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Template(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Template(nil).Stream("list", nil, nil) {
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
		setup := templateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "template." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LMMULTICHANNEL_TEST_TEMPLATE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		templateRef01Ent := client.Template(nil)
		templateRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "template"}, setup.data), "template_ref01"))

		templateRef01DataResult, err := templateRef01Ent.Create(templateRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		templateRef01Data = core.ToMapAny(templateRef01DataResult)
		if templateRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LIST
		templateRef01Match := map[string]any{}

		templateRef01ListResult, err := templateRef01Ent.List(templateRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		templateRef01List, templateRef01ListOk := templateRef01ListResult.([]any)
		if !templateRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", templateRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(templateRef01List), map[string]any{"id": templateRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		templateRef01DataUp0Up := map[string]any{
		}

		templateRef01MarkdefUp0Name := "created_on"
		templateRef01MarkdefUp0Value := fmt.Sprintf("Mark01-template_ref01_%d", setup.now)
		templateRef01DataUp0Up[templateRef01MarkdefUp0Name] = templateRef01MarkdefUp0Value

		templateRef01ResdataUp0Result, err := templateRef01Ent.Update(templateRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		templateRef01ResdataUp0 := core.ToMapAny(templateRef01ResdataUp0Result)
		if templateRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if templateRef01ResdataUp0[templateRef01MarkdefUp0Name] != templateRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", templateRef01MarkdefUp0Name, templateRef01ResdataUp0[templateRef01MarkdefUp0Name])
		}

		// LOAD
		templateRef01MatchDt0 := map[string]any{}
		templateRef01DataDt0Loaded, err := templateRef01Ent.Load(templateRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if templateRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		// REMOVE
		templateRef01MatchRm0 := map[string]any{
			"id": templateRef01Data["id"],
		}
		_, err = templateRef01Ent.Remove(templateRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		templateRef01MatchRt0 := map[string]any{}

		templateRef01ListRt0Result, err := templateRef01Ent.List(templateRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		templateRef01ListRt0, templateRef01ListRt0Ok := templateRef01ListRt0Result.([]any)
		if !templateRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", templateRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(templateRef01ListRt0), map[string]any{"id": templateRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func templateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "template", "TemplateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read template test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse template test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"template01", "template02", "template03", "review01", "review02", "review03"},
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
	entidEnvRaw := os.Getenv("LMMULTICHANNEL_TEST_TEMPLATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LMMULTICHANNEL_TEST_TEMPLATE_ENTID": idmap,
		"LMMULTICHANNEL_TEST_LIVE":      "FALSE",
		"LMMULTICHANNEL_TEST_EXPLAIN":   "FALSE",
		"LMMULTICHANNEL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LMMULTICHANNEL_TEST_TEMPLATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LMMULTICHANNEL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LMMULTICHANNEL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewLmMultichannelSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LMMULTICHANNEL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LMMULTICHANNEL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
