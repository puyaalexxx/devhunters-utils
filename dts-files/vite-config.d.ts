import { ViteConfigOptions, FileEntries } from "../types/types";

export declare function dhtuGetViteConfigs(
    isDevelopmentEnv: boolean,
    tsFiles: Record<string, string>,
    pcssFiles: Record<string, string>,
    tsFilesSuffix: string,
    paths: ViteConfigOptions
): {
    input: Record<string, string>;
    manualChunks: Record<string, any> | ((id: string) => string | undefined);
    entryFileNames: (chunkInfo: { name: string }) => string;
    assetFileNames: (assetInfo: { name: string }) => string;
    cssCodeSplit: boolean;
};