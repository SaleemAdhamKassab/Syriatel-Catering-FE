import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/adminServices/admin.service';

@Component({
  selector: 'app-new-extra',
  templateUrl: './new-extra.component.html',
  styleUrls: ['./new-extra.component.css']
})
export class NewExtraComponent implements OnInit {
  price: any;
  name: any;
  Done: boolean = false;
  Extras: any;
  constructor(private mainservice: AdminService, private snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.mainservice.getExtras().subscribe((x:any) => { this.Extras = x; this.Done = true; })
  }
  createExtra() {
    this.mainservice.addExtra({ Name: this.name, Price: this.price }).subscribe((x: any) => { this.name = null; this.price = null; this.snackBar.open('Extra added !!', 'Done', { duration: 3000 }); this.mainservice.getExtras().subscribe(x => { this.Extras = x; this.Done = true; }) })
  }
  onChangeInput(s: any) {
    s.IsDeleted = true;

  }
  check() {
    return this.name == null || this.price == null;
  }
  saveInput(s: any) {
    this.Done = false;
    s.IsDeleted = false;
    this.mainservice.updateExtra(s).subscribe((x:any) => { this.snackBar.open('Item updated !!', 'Done', { duration: 3000 }) })

  }
}
