// Import all functions from various utility files
import { getFileEntries } from "./file-handlers";
import { getViteConfigs } from "./vite-configs";
import { getTsFileNamesFromPaths } from "./ts-file-names";
import { loadModule } from "./dynamic-module-loading";

// Group them under the Utils object
const Utils = {
    getFileEntries,
    getViteConfigs,
    getTsFileNamesFromPaths,
    loadModule,
};

export default Utils;