
export interface User {
    userID: string,
    username: string,
    utype: string,
    authorization: {
        jwt: string,
        iat: number
    }
}