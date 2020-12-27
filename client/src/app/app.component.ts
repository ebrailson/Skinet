import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/models/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 constructor(){}
  title = 'client';
products:IProduct[];

  ngOnInit(): void {

  }
}
