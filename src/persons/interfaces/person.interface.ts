export interface Person {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    addresses: Addresses[];
    emails: Emails[];
    phones: Phones[]
}

interface Addresses {
    type: string;
    address1: string;
    address2: string;
    street: string;
    city: string;
    state: string
    country: string
    postalCode: string

}

interface Emails {
    type: string;
    value: string;
}

interface Phones {
    type: string;
    code: number;
    number: number;
}