import "@logseq/libs";
import {version as bundledReactVersion} from "react/package.json";
import {LogseqAppInfoFetcher} from "../../src/logseq/LogseqAppInfoFetcher";

/** Select a compatible host pair together; development always uses bundled React. */
export function getHostReact() {
    if (
        process.env.NODE_ENV !== "production" ||
        !LogseqAppInfoFetcher.checkHostAccess() ||
        typeof logseq === "undefined"
    ) {
        return null;
    }
    const React = logseq.Experiments?.React as {version?: string} | undefined;
    const ReactDOM = logseq.Experiments?.ReactDOM as
        | {version?: string; createRoot?: unknown; createPortal?: unknown}
        | undefined;
    if (
        !React?.version?.startsWith("19.") ||
        React.version !== ReactDOM?.version ||
        typeof ReactDOM?.createPortal !== "function" ||
        // Standard react-dom may lack client APIs. Our bundled client renderer can
        // use host React only when its version matches the bundled React exactly.
        (typeof ReactDOM?.createRoot !== "function" && React.version !== bundledReactVersion)
    ) {
        return null;
    }
    return {React, ReactDOM};
}
