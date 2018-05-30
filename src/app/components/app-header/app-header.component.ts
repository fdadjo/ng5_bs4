import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit  { 
  public name;

  ngOnInit() {
    this.name = localStorage.getItem('token');
  }

  public logOut() {
    localStorage.clear();
    window.location.href = '/#/login';
    
  }
}
