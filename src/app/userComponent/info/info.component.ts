import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/userServices/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  displayedColumns = [
    'name',
    'unitPrice',
    'Quantity',
    'Price',
    'Extra',
    'ExtraPrice',
    'final',
  ];
  dataReq: any;
  orderId: any;
  Done: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mainservice: UserService
  ) {
    this.orderId = this.data.orderId;
  }

  ngOnInit() {
    this.mainservice.GetMyOrderById(this.orderId).subscribe((x) => {
      this.dataReq = x;
      this.Done = true;
    });
  }
  getExtra(item: any) {
    var ex = '';
    item.Extras.forEach((element: any) => {
      ex += element.Name + '(' + element.Price + ')';
    });
    return ex;
  }
  extraFinalPrice(item: any) {
    var ex = 0;
    item.Extras.forEach((element: any) => {
      ex += element.Price * item.Quantity;
    });
    return ex;
  }
  getTotalCost() {
    return this.dataReq
      .map((t: any) => t.Quantity)
      .reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalPrice() {
    return this.dataReq
      .map((t: any) => t.UnitPrice * t.Quantity)
      .reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalPriceFinal() {
    return this.dataReq
      .map((t: any) => t.UnitPrice * t.Quantity + this.extraFinalPrice(t))
      .reduce((acc: any, value: any) => acc + value, 0);
  }
}
