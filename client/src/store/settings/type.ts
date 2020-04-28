export interface Settings {
    repo: string,
    mainBranch: string,
    command: string,
    interval: string
}

export interface SettingsState extends Settings {
    processIsGoing: boolean
}