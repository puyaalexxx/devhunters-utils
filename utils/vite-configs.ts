import { ViteConfigOptions } from "../types/types";

/**
 * Get all file names and their paths
 *
 * @param isDevelopmentEnv environment
 * @param tsFiles
 * @param pcssFiles
 * @param tsFilesSuffix
 * @param paths
 *
 * @return
 */
export function dhtuGetViteConfigs(isDevelopmentEnv: boolean, tsFiles: Record<string, string>, pcssFiles: Record<string, string>, tsFilesSuffix: string, paths: ViteConfigOptions) {

    let input: Record<string, string> = {};
    let manualChunks = {};
    let cssCodeSplit = true;
    let entryFileNames: (chunkInfo: { name: string }) => string = () => "[name].js";
    let assetFileNames = (assetInfo: { name: string; }) => {
        if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            const fileName = assetInfo.name.replace(".css", "");
            return assetInfo.name.includes("style.css")
                ? `main[extname]`
                : `css/${fileName}[extname]`;
        }
        return paths.assetFileNames + "/[name][extname]";
    };

    // Using the mode parameter to control logic
    if (isDevelopmentEnv) {
        input = {
            ...tsFiles,
            ...pcssFiles,
        };

        entryFileNames = (chunkInfo: any) => {
            if (chunkInfo.name.endsWith(tsFilesSuffix)) {
                return `js/${chunkInfo.name.replace(tsFilesSuffix, "")}.js`;
            }

            return "[name].js";
        };

    } else {
        input = {
            main: paths.mainEntry + "/main.ts",
            ...pcssFiles,
        };

        manualChunks = (id: string) => {
            if (id.includes(paths.tsChunks)) {
                const parts = id.split(paths.tsChunks)[1].split("/");

                //add the files to the js folder so they can be separately from the main file
                return parts.length > 1 ?
                    `js/${parts[parts.length - 1].replace(tsFilesSuffix, "").replace(".js", "").replace(".ts", "")}`
                    : `js/[name].js`;
            }
        };

        cssCodeSplit = false; // Ensure CSS is bundled into a single file
    }

    return { input, manualChunks, entryFileNames, assetFileNames, cssCodeSplit };
}