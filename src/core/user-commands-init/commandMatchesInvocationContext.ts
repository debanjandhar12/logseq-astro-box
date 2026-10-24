import type {CommandFileData} from "../stores/command-file-store/types";
import type {CommandInvocationContext} from "./types";

export function commandMatchesInvocationContext(
    commandFile: CommandFileData,
    context: CommandInvocationContext
): boolean {
    return context.locations.some((location) => commandFile.invokeLocations.includes(location));
}
