import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.css']
})
export class NotAuthComponent implements OnInit {

  constructor(private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.title.setTitle('Not Authrize');

  }
  backHome() {
    this.router.navigate(['/Home']);
  }
}
