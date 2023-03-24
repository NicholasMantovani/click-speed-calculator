export interface User {
    id?: string,
    name: string,
    surname: string,
}

export interface TimesInput {
    userId: string,
    times: Array<number>
}

export interface LoginProps {
    onAddUser?: Function;
}


export interface SpeedClickProps {
    username: string;
}

export interface Data {
    payload: Payload;
}
export interface Payload {
    x: Array<number>,
    y: Array<number>,
    info: Map<string, string>,
    classification: Array<UserBestTime>
}


export interface UserBestTime {
    time: number,
    user: string,
    userId: string
}