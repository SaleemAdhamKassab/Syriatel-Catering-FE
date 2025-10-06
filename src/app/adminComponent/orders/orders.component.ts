import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/adminServices/admin.service';
import { ConfirmComponent } from 'src/app/sharedComponent/confirm/confirm.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  y = new Date().getFullYear();
  m = new Date().getMonth();
  d = new Date().getDate();
  length = 0;
  Date2 = new Date(this.y, this.m, this.d);
  displayedColumns2 = [
    'name',
    'unitPrice',
    'Quantity',
    'Price',
    'Extra',
    'ExtraPrice',
    'final',
  ];
  displayed = ['UserName', 'Id', 'CreateDate', 'Way'];
  displayedColumns3 = ['name', 'Quantity', 'Extra'];

  type: string[] = ['الملغية', 'المنجزة'];
  selectedType = 'الملغية';
  orders!: any[];
  table: any;
  seletedOrder: any;
  OrdersLength: number = -1;
  Done: boolean = false;
  error: number = -1;
  cindex!: number;
  dataTable: MatTableDataSource<unknown>;
  typeOrder: any;
  massageType!: string;
  ShowOp!: boolean;

  constructor(
    private mainservice: AdminService,
    private title: Title,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataTable = new MatTableDataSource();
    this.title.setTitle('Orders');

    this.route.queryParamMap.subscribe((x: any) => {
      this.seletedOrder = null;
      this.table = null;
      this.Done = false;
      this.typeOrder = x.get('type');
      this.massageType =
        this.typeOrder == 'Pending'
          ? 'الطلبات الحالية'
          : this.typeOrder == 'Done'
          ? 'الطلبات المنجزة'
          : 'الطلبات الملغية';
      this.ShowOp = this.typeOrder == 'Pending' ? true : false;
      this.mainservice.getOrders(this.Date2).subscribe((x: any) => {
        this.orders = x;
        this.OrdersLength = x.length;
        this.dataTable.data = this.orders.filter(
          (x: any) => x.Status.Name == this.typeOrder
        );
        this.Done = true;
      });
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {}

  click() {
    this.dataTable.filter = '';
    this.cindex = 10;
    this.Done = false;
    this.table = null;
    this.seletedOrder = null;
    this.mainservice.getOrders(this.Date2).subscribe((x: any) => {
      this.orders = x;
      this.dataTable.data = this.orders.filter(
        (x: any) => x.Status.Name == this.typeOrder
      );
      this.Done = true;
    });
  }
  getData(i: any) {
    this.dataTable.filter = '';
    this.cindex = 10;
    this.table = null;
    this.seletedOrder = null;
    var j = this.orders.findIndex((x: any) => x.Id == i);
    this.orders.splice(j, 1);
    this.dataTable.data = this.orders.filter(
      (x: any) => x.Status.Name == this.typeOrder
    );

    // this.mainservice.getOrders(this.Date2.toDateString()).subscribe((x: any) => { this.orders = x; this.dataTable.data = this.orders.filter((x: any) => x.Status.Name == this.typeOrder); this.Done = true; })
  }
  handleError(error: HttpErrorResponse) {
    this.error = error.status;
    this.router.navigate(['/Authrize']);
    return null;
  }
  getTotalCost() {
    return this.seletedOrder
      .map((t: any) => t.Quantity)
      .reduce((acc: any, value: any) => acc + value, 0);
  }
  getTotalPrice() {
    return this.seletedOrder
      .map(
        (t: any) =>
          t.Quantity * t.Product.InitialPrice + this.extraFinalPrice(t)
      )
      .reduce((acc: any, value: any) => acc + value, 0);
  }

  openTable(i: any, index: any) {
    this.cindex = index;
    this.table = i;
    this.mainservice.GetMyOrderById(i.Id).subscribe((x: any) => {
      this.seletedOrder = x;
    });
  }
  extra(i: any) {
    var ex = '';
    i.Extras.forEach((element: any) => {
      ex += element.Name + '(' + element.Price + '),';
    });
    return ex;
  }
  extraFinalPrice(i: any) {
    var ex = 0;
    i.Extras.forEach((element: any) => {
      ex += element.Price * i.Quantity;
    });
    return ex;
  }
  cancel(i: any) {
    const dialogRef = this.dialog
      .open(ConfirmComponent, {
        panelClass: 'confirm-dialog',
        data: 'تاكيد الغاء الطلب؟',
      })
      .afterClosed()
      .subscribe((x: any) => {
        if (x) {
          //   this.table = null;
          //  this.seletedOrder = null;
          this.mainservice.cancelOrder(i[0].OrdertId).subscribe((x: any) => {
            x;
            this.snackBar.open('Order Cancelled !!', 'Done', {
              duration: 3000,
            });
            this.getData(i[0].OrdertId);
          });
        }
      });
  }
  done(i: any) {
    const dialogRef = this.dialog
      .open(ConfirmComponent, {
        panelClass: 'confirm-dialog',
        data: 'تاكيد انجاز الطلب ؟',
      })
      .afterClosed()
      .subscribe((x: any) => {
        if (x) {
          //  this.table = null;
          // this.seletedOrder = null;
          this.mainservice.handelOrder(i[0].OrdertId).subscribe((x: any) => {
            this.snackBar.open('Order Finished !!', 'Done', { duration: 3000 });
            this.getData(i[0].OrdertId);
          });
        }
      });
  }
  print() {
    print();
  }
}
