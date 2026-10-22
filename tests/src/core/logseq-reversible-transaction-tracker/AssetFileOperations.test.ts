import {afterEach, describe, expect, test, vi} from "vitest";
import {AssetFileOperations} from "../../../../src/core/logseq-reversible-transaction-tracker/commands/utils/AssetFileOperations";
import {WindowParentBridge} from "../../../../src/logseq/WindowParentBridge";

const resolved = {
    graphRoot: "/graph",
    fullPath: "/graph/assets/test",
    graphRelativePath: "assets/test",
    assetsRelativePath: "test"
};
afterEach(() => vi.restoreAllMocks());

describe("bounded asset previews", () => {
    test("rejects malformed metadata", async () => {
        vi.spyOn(WindowParentBridge, "getWindow").mockReturnValue({
            apis: {doAction: vi.fn(async () => ({size: NaN}))}
        } as never);
        await expect(AssetFileOperations.getMetadata(resolved)).rejects.toThrow("metadata");
    });
});
