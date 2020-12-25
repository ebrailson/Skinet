import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/products';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 constructor(private http:HttpClient){}
  title = 'client';
products:IProduct[];

  ngOnInit(): void {

   this.http.get('https://localhost:5001/api/products').subscribe((response:IPagination)=>{
this.products=response.data;
   }, error=>{
    console.log(error)
   })
  }
}
