import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl, FormArray, Validators } from '@angular/forms';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Observable, Observer, Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    this.mySub.unsubscribe();
  }
  ngOnInit(): void {
    this.mySub = this.myOb.subscribe(
      (data: any) => {},
      (error: any) => {},
      () => {}
    );
  }
  myText = 'Alaa homsi';
  myObject = { name: 'Alaa' };
  myNumber = 1234.333;
  myDate = Date();
  Array = [1, 2, 3, 4];
  title = 'starter-full12';
  @ViewChild('myInput') _Input: any;
  myOb = Observable.create((Observer: Observer<string>) => {
    setTimeout(() => {
      Observer.next('hello');
    }, 1000);
  });
  mySub!: Subscription;

  myForm = new FormGroup({
    user: new FormArray([new FormControl(null), new FormControl(null)]),
  });
  myForm2 = new FormGroup({
    name: new FormControl(null, this.myAsnc),
    email: new FormControl(null),
  });
  onkeyup(e: any) {}
  add() {
    this.Array.push(8);
  }
  onSubmit(f: Form) {}
  openForm() {}
  openForm2() {}
  myVal(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == 'alaa') return null;
      return { alaa: true };
    };
  }
  myAsnc(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      return new Promise((resolve) => {
        if (control.value != 'alaa') resolve(null);
        else resolve({ alaa: true });
      });
    };
  }
}
