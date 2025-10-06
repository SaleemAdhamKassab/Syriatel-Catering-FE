import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/adminServices/admin.service';
import { ConfirmComponent } from 'src/app/sharedComponent/confirm/confirm.component';
import { CategoriesComponent } from '../categories/categories.component';
import { NewExtraComponent } from '../new-extra/new-extra.component';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products: any;
  Done!: boolean;
  news: any;
  isChecked: any;
  constructor(private title:Title,private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private mainservice: AdminService,) { 
    this.title.setTitle('Products');

  }

  ngOnInit() {
    this.mainservice.GetAdminProducts().subscribe(x => {
      this.Products = x;
      this.Products.forEach((element: any) => {
        element.Products.forEach((_element: any) => {
          _element.show = false;
        })
      })
        ; this.Done = true;
    });
    this.mainservice.GetCafeteariaNews().subscribe((x: any) => {
      this.news = x, this.news.forEach((element: any) => {
        element.show = false;
      })
    });
    this.mainservice.GetSystemStatus().subscribe((x: any) => { this.isChecked = x[0].SystemEnable; })

  }

  newProduct() {
    this.Done = false;
    const dialogRef = this.dialog.open(NewProductComponent, {
      panelClass: 'confirm-dialog',
    }).afterClosed().subscribe(x => {
      this.mainservice.GetAdminProducts().subscribe(x => {
        this.Products = x; this.Done = true;
      });
    })
  }
  newExtra() {
    this.Done = false;
    const dialogRef = this.dialog.open(NewExtraComponent, {
      width: '50vw',
      height: '80vh',
    }).afterClosed().subscribe(x => {
      this.mainservice.GetAdminProducts().subscribe(x => {
        this.Products = x; this.Done = true;
      });
    })
  }
  newCategory() {
    this.Done = false;
    const dialogRef = this.dialog.open(CategoriesComponent, {
      width: '50vw',
      height: '80vh',
    }).afterClosed().subscribe(x => {
      this.mainservice.GetAdminProducts().subscribe(x => {
        this.Products = x; this.Done = true;
      });
    })
  }
  click(item: any) {
    item.Enable = !item.Enable;
    this.mainservice.updateProduct(item).subscribe((x: any) => {
      this.snackBar.open('Item updated !!', 'Done', { duration: 3000 })
    });

  }
  onChangeInput(input: any) {
    input.show = true;
  }
  saveInput(input: any) {
    this.mainservice.updateProduct(input).subscribe((x: any) => { this.snackBar.open('Item updated !!', 'Done', { duration: 3000 }); input.show = false; });

  }
  changeStatus() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      panelClass: 'confirm-dialog',
      data: 'هل انت متاكد ؟'
    }).afterClosed().subscribe(x => {
      if (x) {
        if (this.isChecked) {
          this.mainservice.activeCafetearia().subscribe(x => this.isChecked = this.isChecked);
          this.snackBar.open('System Now !!', 'Active', { duration: 3000 })
        }
        else {
          this.mainservice.diactiveCafetearia().subscribe(x => this.isChecked = this.isChecked);
          this.snackBar.open('System Now !!', 'Not Active', { duration: 3000 })
        }
      }
      else {
        this.isChecked = !this.isChecked
      }
    })
  }
  updateTitle(data:any){
    data.show=false;
    this.mainservice.updateTitle(data).subscribe((x:any)=> this.snackBar.open('Title', 'updated', { duration: 3000 }))
  }
}
