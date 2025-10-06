import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/adminServices/admin.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  Products!: Product[];
  Done: boolean = false;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string, private mainservice: AdminService, private snackBar: MatSnackBar,) { }
  quantity: any;
  price: any;
  name: any;
  type: any;
  ngOnInit() {
    this.mainservice.GetAdminProducts().subscribe(x => {
      this.Products = x; this.Done = true;
    });
  }
  create() {
    this.mainservice.createProduct({ Name: this.name, InitialPrice: this.price, CategoryId: this.type, Enable: true, AvailableProduact: this.quantity }).subscribe((x:any) => {
      this.snackBar.open('Category added !!', 'Done', { duration: 3000 })
      this.quantity = null; this.price = null; this.name = null; this.type = null;
    })
  }
  empty() {
    return this.quantity == null ||
      this.price == null ||
      this.name == null ||
      this.type == null;
  }
}
