import { Transactions } from './transactions';

export class Order {
    Location!: string;
    Roof!: string;
    Way!: string;
    Note!: string;

    Transactions = new Array<Transactions>();
}
