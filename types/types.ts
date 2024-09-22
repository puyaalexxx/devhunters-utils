export type ViteConfigOptions = {
    mainEntry: string;
    tsChunks: string;
    assetFileNames: string;
};

export type FileEntries = {
    [key: string]: string; // Index signature allowing dynamic string keys
}
