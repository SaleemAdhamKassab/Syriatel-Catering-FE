import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/sharedComponent/confirm/confirm.component';
import { UserService } from 'src/app/userServices/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  user: any;
  Done: boolean = false;
  found: any;
  userInfo!: boolean;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private title: Title,
    private myservise: UserService
  ) {}
  ngOnInit(): void {
    this.myservise.GetMyUser().subscribe((x) => {
      this.user = x;
      this.myservise.GetDataUser(this.user).subscribe((x) => {
        this.userInfo = x;
        this.Done = true;
        if (this.userInfo != false) {
          this.route.navigateByUrl('Home');
        }
      });
    });

    this.title.setTitle('Sign Up');
  }
  buildings: any = ['البرج', 'الشام القابضة'];
  Floors: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
  getBuilding() {
    return this.myInfo.value.Location == this.buildings[0] ? 13 : 3;
  }
  registerInfo() {
    const dialogRef = this.dialog
      .open(ConfirmComponent, {
        width: '600px',
        height: 'auto',
        data: 'تأكيد تسجيل مع البيانات السابقة؟',
      })
      .afterClosed()
      .subscribe((x) => {
        if (x) {
          this.myservise.createUser(this.myInfo.value).subscribe((x) => {
            this.route.navigate(['/Home']);
          });
        }
      });
  }
}
