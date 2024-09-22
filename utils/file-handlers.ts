import { globSync } from "glob";
import { FileEntries } from "../types/types";
import { unlink, access } from "fs/promises";
import { constants } from "fs";

/**
 * Get all file names and their paths
 *
 * @param path Path module from Vite
 * @param searchPaths
 * @param fileExtension
 * @param keySuffix Suffix used for key names
 *
 * @return
 */
export function dhtuGetFileEntries(path: any, searchPaths: string, fileExtension: string, keySuffix = "") {

    //get all the files from the path
    const files = globSync(searchPaths); // Adjust this path to match your folder structure

    const entries: FileEntries = {};
    //get file name and its path
    files.forEach((file) => {
        const name = path.basename(file, "." + fileExtension);
        entries[name + keySuffix] = file;
    });

    return entries;
}

/**
 * Check if the file exists
 *
 * @param filePath
 *
 * @return
 */
export async function dhtuFileExists(filePath : string) {
    try {
        await access(filePath, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * Remove all the tsc compiler js generated files alongside ts files.
 *
 * This function accepts an array of paths to clean up.
 * These paths can be glob patterns or specific files.
 *
 * @param {string[]} pathsToClean - An array of file paths or glob patterns to remove.
 * 
 * @return void
 */
export async function dhtuRemoveJsGeneratedFiles(pathsToClean : [ string ]) {
    try {
        for (const item of pathsToClean) {
            // Check if item is a glob pattern or a specific file
            if (item.includes("**")) {
                // Handle as glob pattern
                const files = globSync(item);

                for (const file of files) {
                    // If file does not exist, skip
                    if (!(await dhtuFileExists(file))) return;

                    try {
                        await unlink(file);
                    } catch (err) {
                        console.error(`Error removing file ${file}`, err);
                    }
                }
            } else {
                // If file does not exist, skip
                if (!(await dhtuFileExists(item))) return;

                // Handle as specific file
                try {
                    await unlink(item);
                } catch (err) {
                    console.error(`Error removing file ${item}`, err);
                }
            }
        }
    } catch (err) {
        console.error("Error processing files", err);
    }
}