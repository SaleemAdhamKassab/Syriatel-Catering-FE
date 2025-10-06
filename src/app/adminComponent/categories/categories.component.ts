import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/adminServices/admin.service';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  Done: boolean = false;
  Products: any;
  name: any = '';
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private mainservice: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.mainservice.GetAdminProducts().subscribe((x: any) => {
      this.Products = x;
      this.Done = true;
    });
  }
  empty() {
    return this.name.length == '';
  }
  closeWithResult() {
    const product = new Product();
    product.Name = this.name;
    product.Enable = true;
    this.mainservice.createCategory({ Name: product.Name }).subscribe((x) => {
      this.snackBar.open('Category added !!', 'Done', { duration: 3000 });
    });
    this.Products.push(product);
  }

  click(i: any) {
    i.Enable = !i.Enable;
    this.mainservice.updateCategory(i).subscribe((x) => {
      this.snackBar.open('Category updated !!', 'Done', { duration: 3000 });
    });
  }
}
