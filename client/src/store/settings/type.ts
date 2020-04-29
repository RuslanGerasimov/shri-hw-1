export interface Settings {
    id?: string,
    repo: string,
    mainBranch: string,
    command: string,
    interval: string
}

export interface SettingsState extends Settings {
    processIsGoing: boolean
}