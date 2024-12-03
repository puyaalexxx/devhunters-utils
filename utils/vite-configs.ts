import { ViteConfigOptions } from "../types/types";

/**
 * Get all file names and their paths
 *
 * @param separateFiles Generate everything in one file if false or separate files 
 * @param tsFiles
 * @param pcssFiles
 * @param tsFilesSuffix
 * @param paths
 *
 * @return
 */
export function dhtuGetViteConfigs(separateFiles: boolean, tsFiles: Record<string, string>, pcssFiles: Record<string, string>, tsFilesSuffix: string, paths: ViteConfigOptions) {

    let input: Record<string, string> = {};
    let manualChunks = {};
    let cssCodeSplit = true;
    let entryFileNames: (chunkInfo: { name: string }) => string = () => "[name].js";

    //css file generation helpe function
    let assetFileNames = (assetInfo: { name: string; }) => {
        if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            const fileName = assetInfo.name.replace(".css", "");
            return assetInfo.name.includes("style.css")
                ? `main[extname]`
                : `css/${fileName}[extname]`;
        }
        return paths.assetFileNames + "/[name][extname]";
    };

    //helpers/node folder script generation function helper
    let generateHelperFiles = (id : string) => {
        // Extract the file name (without extension) from the id
        const fileName = id.split('/').pop()?.replace(/\.(ts|js)$/, ''); // Remove both .ts and .js extensions

        // Return the correct chunk name with .js for both .ts and .js files
        return `js/${fileName}`;
    };


    // Using the mode parameter to control logic
    if (separateFiles) {
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

        manualChunks = (id: string) => {
            //this file us used by vite for dynamic loading
            if (id.includes("preload-helper")) {
                return `vite-helpers/preload-helper`;
            }
            //add js helper files from the helpers folder to js folder
            else if (id.includes("helpers/node")) {
                return generateHelperFiles(id);
            }
        };

    } else {
        input = {
            main: paths.mainEntry + "/main.ts",
            ...pcssFiles,
        };

        manualChunks = (id: string) => {
            if (id.includes("assets/scripts/modules")) {
                const parts = id.split(paths.tsChunks)[1].split("/");

                //add the files to the js folder so they can be separately from the main file
                return parts.length > 1 ?
                    `js/${parts[parts.length - 1].replace(tsFilesSuffix, "").replace(".js", "").replace(".ts", "")}`
                    : `js/[name].js`;
            }
            //add js helper files from the helpers folder to js folder
            else if (id.includes("helpers/node")) {
                return generateHelperFiles(id);
            }
        };

        cssCodeSplit = false; // Ensure CSS is bundled into a single file
    }

    return { input, manualChunks, entryFileNames, assetFileNames, cssCodeSplit };
}