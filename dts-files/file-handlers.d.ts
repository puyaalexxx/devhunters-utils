export declare function dhtuGetFileEntries(
    path: any,
    searchPaths: string,
    fileExtension: string,
    keySuffix?: string
): Record<string, string>;

export declare function dhtuFileExists(filePath: string): Promise<boolean>;

export declare function dhtuRemoveJsGeneratedFiles(pathsToClean: string[]): Promise<void>;