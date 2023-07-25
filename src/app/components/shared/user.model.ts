import { Request } from "./request.model";

export class User {
    constructor(
        public userId: string,
        public username: string,
        public password: string,
        public email: string,
        public state: string,
        public city: string,
        public address: string,
        public dateOfBirth: string,
        public gender: string,
        public phoneNumber: string,
        public role: string,
        public requests: Request[]
    ) {

    }
}