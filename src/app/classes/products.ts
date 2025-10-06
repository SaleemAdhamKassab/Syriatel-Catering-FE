import { Extras } from './extras';

export class Products {
    Id !:string;
    Name !:  string  ;
    InitialPrice !: number ;
    CategoryId !:number ;
    Enable !: boolean ;
    AvailableProduact !:number;
    Transactions !: string ;
    IsDeleted !: boolean;
    value:number=0;
    Extras!:Extras[];
    check!:boolean;
    show!:boolean;
}
