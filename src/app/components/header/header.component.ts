import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  burgerStatus = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeBurger(): void {
    this.burgerStatus = !this.burgerStatus;
  }
}
