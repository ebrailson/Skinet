import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
baseUrl=environment.apiUrl
validationError:any
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
  }
    get404(){
      this.http.get(this.baseUrl +'buggy/products/987').subscribe(response=>{
        console.log(response)
      },
      error=>{
        console.log(error);  
    });
  }

get500(){
  this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response=>{
    console.log(response)
  }),
  error=>{
    console.log(error);
  }
}

get400(){
  this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response=>{
    console.log(response)
  }),
  error=>{
    console.log(error);
  }
}

get400ValidationError(){
  this.http.get(this.baseUrl + 'products/fortytwo').subscribe(response=>{
    console.log(response)
  }),
  error=>{
    console.log(error);
    this.validationError=error.errors;
  }
}
}

