import { Extras } from './extras';

export class Transactions {
    ProductId !:number;
    Quantity !:  number; 
    UnitPrice !:  number;
    Extras = new Array<Extras>();
}
