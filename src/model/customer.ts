import ICustomerInterface from "./customer-interface";

export default class Customer implements ICustomerInterface {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly lastName: string,
        public readonly birthDate: Date,
        public readonly gender: string
    ) { }
}