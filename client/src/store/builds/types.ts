export interface Build {
    status: Statuses,
    start: string,
    duration: number,
    buildNumber: number,
    commitMessage: string,
    branchName: string,
    id: string,
    authorName: string,
    commitHash: string,
}

enum Statuses {
    New = 'new',
    Process = 'process',
    Success = 'success',
    Fail = 'fail',
    Cancel = 'cancelled',
}
