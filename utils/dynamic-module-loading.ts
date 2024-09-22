/**
 * Helper function to load modules dynamically
 *
 * @return void
 */
export async function dhtuLoadModule(modules: Record<string, () => Promise<unknown>>, fileName: string, fileExtension = "ts") {
    try {
        const searchModule = `/${fileName}.${fileExtension}`;

        //see if the module path exists in the modules object from the vite glob function
        const fullModulePath = Object.keys(modules).find((key: string) =>
            key.includes(searchModule),
        );

        //if path exist, load it dynamically
        if (fullModulePath) {
            await modules[fullModulePath]();
        }

    } catch (err) {
        console.error(`Error loading ${fileName} module:`, err);
    }
}