export class Donor {
    constructor(
        private username: string,
        private password: string,
        private email: string,
        private state: string,
        private city: string,
        private address: string,
        private dateOfBirth: string,
        private gender: string,
        private phoneNumber: string,
        private role: string
    ) {

    }
}