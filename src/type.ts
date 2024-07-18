export type CarResponse = {
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
    _links: {
        self: {
            href: string;
        },
        cars: {
            href: string;
        },
        owner: {
            href: string;
        }
    }
}