import { Products } from './products';

export class Product {
    Id!:number;
Name!: string;
Quantity:number=0;
Enable!: boolean;
Category!: string;
Products= new Array<Products>();
IsDeleted!: boolean;
AvailableProduact!: boolean;
}
