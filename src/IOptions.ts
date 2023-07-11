export interface IOptions {
    repository: string;
    prefix: string;
    workingDir: string;
    commit: string;
    baseCommit: string;
    head: string;
    base?: string;
    shouldFilterChangedFiles: boolean;
    dontPostIfNoChangedFilesInReport: boolean;
    title: string;
    failDropThreshold: string;
    maxUncoveredLines: number;
    changedFiles: string[];
}