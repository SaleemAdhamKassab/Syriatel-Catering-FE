import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/classes/order';
import { ConfirmComponent } from 'src/app/sharedComponent/confirm/confirm.component';
import { UserService } from 'src/app/userServices/user.service';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  buildings: any = ['البرج', 'الشام القابضة'];
  Floors: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  Products: any;
  price = 0;
  color = 1;
  myOrders: any[] | undefined;
  news: any[] | undefined;
  y = new Date().getFullYear();
  m = new Date().getMonth();
  d = new Date().getDate();
  Date1 = new Date(this.y, this.m, this.d);
  active = 0;
  Done: any = false;
  user: any;
  status: any;
  building: any;
  floor: any = 1;
  Note: any;
  groupSelected = new Array<any>();
  myOrderslength: any;
  userInfo: any;
  myOrder: any;
  Extra: any;
  ExtraPrice: number = 0;
  myInfo = new FormGroup({
    Note: new FormControl('', Validators.required),
    Phone: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.required,
      Validators.pattern('09[0-9]*'),
    ]),
    Location: new FormControl('', Validators.required),
    Floor: new FormControl('', Validators.required),
  });

  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private myService: UserService,
    private title: Title
  ) {}
  ngOnInit(): void {
    this.groupSelected = [];
    this.title.setTitle('Home');
    this.prepareData();
    this.getMyOrders();
  }
  inputChanged(item: any, Extra: any, value: any) {
    var selected = this.groupSelected.find((x) => x.Name == item.Name);
    var ExtraSelected = selected.Extras.find((x: any) => x.Name == Extra.Name);
    ExtraSelected.Quantity = value == '' ? item.value : value;
    this.addExtra(0, 0);
  }
  getBuilding() {
    return this.myInfo.value.Location == this.buildings[0] ? 13 : 3;
  }
  getTempBuilding() {
    return this.building == this.buildings[0] ? 3 : 13;
  }
  addItem(item: any) {
    item.Extras = [];
    item.check = true;
    item.value++;
    if (!this.groupSelected.find((x) => x.Name == item.Name))
      this.groupSelected.push(item);
    this.price = 0;
    this.groupSelected.forEach((element) => {
      this.price += element.InitialPrice * element.value;
    });
    this.addExtra(0, 0);
  }
  empty() {
    return this.groupSelected.length == 0;
  }
  rightClick(event: any, i: any) {
    i.Extras = [];
    i.check = true;
    event.preventDefault();
    event.stopPropagation();
    if (i.value != 0) {
      if (i.value != 1) {
        i.value--;
      } else {
        i.value--;
        const j = this.groupSelected.findIndex((x) => x.Name == i.Name);
        this.groupSelected.splice(j, 1);
      }

      this.price = 0;
      this.groupSelected.forEach((element) => {
        this.price += element.InitialPrice * element.value;
      });
      this.addExtra(0, 0);
    }
  }
  sortArray(data: any[]) {
    return data.sort((a, b) =>
      a.AvailableProduact <= 0 || a.Enable == false ? 1 : -1
    );
  }
  removeCheck(i: any) {
    var j = this.groupSelected.findIndex((x) => x.Name == i.Name);
    i.check = true;

    this.groupSelected.splice(j, 1);
    i.Extras = null;
    i.value = 0;
    this.price = 0;
    this.groupSelected.forEach((element) => {
      this.price += element.InitialPrice * element.value;
    });
    this.addExtra(0, 0);
  }
  openInvoice(order: any) {
    const dialogRef = this.dialog
      .open(InfoComponent, {
        width: '50vw',
        height: '80vh',
        data: { orderId: order.Id, orderNote: order.Note },
      })
      .afterClosed()
      .subscribe((x) => {
        if (x) {
        }
      });
  }
  sendOrder() {
    this.myService.GetSystemStatus().subscribe((x) => {
      if (x[0].SystemEnable) {
        const dialogRef = this.dialog
          .open(ConfirmComponent, {
            panelClass: 'confirm-dialog',
            data: { title: 'تاكيد تسجيل طلبك ؟', color: this.status },
          })
          .afterClosed()
          .subscribe((x) => {
            if (x) {
              this.orderSolid(null);
            }
          });
      } else {
        this.groupSelected.forEach((element) => {
          element.value = 0;
          this.price = 0;
        }),
          (this.groupSelected = []);
        this.snackBar.open('system now!!', 'not available', { duration: 9000 });
        this.active = 0;
      }
    });
  }
  addExtra(i: any, j: any) {
    this.price = 0;
    this.groupSelected.forEach((element) => {
      this.ExtraPrice = 0;
      element.Extras.forEach((element1: any) => {
        if (element.Name == j.Name) element1.Quantity = j.value;
        this.ExtraPrice +=
          element1.Price *
          (element1.Quantity > 0 ? element1.Quantity : element.value);
      });
      this.price += element.InitialPrice * element.value + this.ExtraPrice;
    });
    //this.ExtraNew=this.groupSelected;
  }
  showItem(item: any) {}
  refresh() {
    if (confirm('سوف تفقد الجلسة الحالية')) {
      this.Date1 = new Date(this.y, this.m, this.d);

      this.price = 0;
      this.ngOnInit();
    }
  }
  changeStyle(i: any) {}
  prepareData() {
    this.myService.GetMyUser().subscribe((x) => {
      this.user = x;
      this.myService.GetDataUser(this.user).subscribe((x) => {
        this.userInfo = x;
        this.floor = this.userInfo?.Location;
        this.building = this.userInfo?.Floor;
        if (this.userInfo == false) {
          this.route.navigateByUrl('LogIn');
        } else {
          this.myInfo = new FormGroup({
            UserName: new FormControl(
              this.userInfo.UserName,
              Validators.required
            ),
            Note: new FormControl(this.userInfo.Note, Validators.required),
            Phone: new FormControl(this.userInfo.Phone, [
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.required,
              Validators.pattern('09[0-9]*'),
            ]),
            Location: new FormControl(
              this.userInfo.Location,
              Validators.required
            ),
            Floor: new FormControl(this.userInfo.Floor, Validators.required),
          });
        }
        this.myService.GetProducts().subscribe((x) => {
          this.Products = x;
          this.Done = true;
          this.active = x.length;
          this.Products.forEach((element: any) => {
            element.Products.forEach((e: any) => {
              e.value = 0;
              e.Extras = [];
              e.check = true;
            });
            element.Products = this.sortArray(element.Products);
          });
        });
      });
    });
    this.myService.GetCafeteariaNews().subscribe((x) => (this.news = x));
    this.myService.getExtras().subscribe((x: any) => {
      this.Extra = x.filter((x: any) => x.Price != -1);
    });
  }
  updateUser() {
    this.myService.updateInfoUser(this.myInfo.value).subscribe((x: any) => {
      this.snackBar.open('My Information has been  updated !!', 'Done', {
        duration: 3000,
      });
      this.userInfo.Location = this.myInfo.value.Location;
      this.userInfo.Floor = this.myInfo.value.Floor;
      this.userInfo.Phone = this.myInfo.value.Phone;
      this.userInfo.Note = this.myInfo.value.Note;
    });
  }
  getMyOrders() {
    this.myService.GetMyOrders(this.Date1.toDateString()).subscribe((x) => {
      this.myOrders = [];
      this.myOrders = x;
      this.myOrderslength = x.length;
    });
  }
  check() {
    var result =
      this.myInfo.value.Floor == this.userInfo?.Floor &&
      this.myInfo.value.Phone == this.userInfo?.Phone &&
      this.myInfo.value.Location == this.userInfo?.Location &&
      this.myInfo.value.Note == this.userInfo?.Note;
    return result;
  }
  orderSolid(x: any) {
    this.myOrder = new Order();
    this.myOrder.Way = x;
    this.myOrder.Note = this.Note;
    this.groupSelected.forEach((element) => {
      this.myOrder.Transactions.push({
        ProductId: element.Id,
        Quantity: element.value,
        UnitPrice: element.InitialPrice,
        Extras: element.Extras,
      });
    });
    this.myOrder.Location = this.floor;
    this.myOrder.Roof = this.building;
    this.myService.newOrder(this.myOrder).subscribe((e: string | any) => {
      if (e.Id > 0) {
        this.ngOnInit();
        this.groupSelected.forEach((element) => {
          element.value = 0;
          element.Extras = null;
        }),
          (this.groupSelected = []);
        this.Note = '';
        this.price = 0;
        this.myService
          .GetMyOrders(this.Date1.toDateString())
          .subscribe((x: any) => {
            this.myOrders = [];
            this.myOrders = x;
            this.snackBar.open('تم ارسال الطلب   ', 'Done', { duration: 3000 });
          });
      } else {
        this.snackBar.open('Not available of :  ' + e, '☹️☹️☹️', {
          duration: 6000,
        });
        e.forEach((e: any) => {
          this.groupSelected.forEach((element) => {
            if (e == element.Name) element.check = false;
          });
        });
      }
    });
  }
  getExpected(order: any) {
    return '1:30';
  }
  showForm() {}

  deleteOrder(order: any, event: MouseEvent): void {
    event.stopPropagation();

    const confirmed = confirm(`هل أنت متأكد من حذف الطلب رقم ${order.Id}؟`);
    if (!confirmed) return;

    this.myService.deleteOrder(order.Id).subscribe({
      next: () => {
        this.myOrders = this.myOrders?.filter((o) => o.Id !== order?.Id);
      },
      error: (err) => {
        console.error('Failed to delete order:', err);
        alert('حدث خطأ أثناء حذف الطلب.');
      },
    });
  }
}
