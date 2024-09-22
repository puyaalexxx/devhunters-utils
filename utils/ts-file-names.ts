/**
 * Get all ts file names as an object with key-value pairs
 *
 * @return Record<string, string>
 */
export function getTsFileNamesFromPaths(allModules: Record<string, () => Promise<unknown>>) {

    // Create an object with key-value pairs
    const tsFileNames: Record<string, string> = {};

    // if the ts file looks like this: create-sidebars, the key will be like this create_sidebars
    Object.keys(allModules).forEach((path) => {
        // Extract the base name of the file
        const parts = path.split("/"); // Split the path by '/'
        const fileWithExtension = parts[parts.length - 1]; // Get the last part (file with extension)
        const fileName = fileWithExtension.replace(".ts", ""); // Remove the ".ts" extension

        // Create the key by transforming the file name to snake_case
        const keyName = fileName.replace(/-/g, "_");

        // Add to the object: key -> value (key = file name transformed, value = original file name)
        tsFileNames[keyName] = fileName;
    });


    return tsFileNames;
}