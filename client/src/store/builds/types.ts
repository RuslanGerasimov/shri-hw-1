export enum BuildStatues {
    New = 'new',
    Process = 'process',
    Success = 'success',
    Fail = 'fail',
    Cancel = 'cancelled',
}

export interface Build {
    status: BuildStatues,
    start: string,
    duration: number,
    buildNumber: number,
    commitMessage: string,
    branchName: string,
    id: string,
    authorName: string,
    commitHash: string,
}