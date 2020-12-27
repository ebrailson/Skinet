import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/type';
import { IBrand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static:true}) searchTerm: ElementRef;
  products:IProduct[];
types:IType[];
brands:IBrand[];
totalCount:number;
shopParams= new ShopParams();
sortOptions=
[{
  name:'Alphabetical', value:'name'
},
{
  name:'Price: Low to High', value:'priceAsc'
},
{name:'Price: High to Low', value:'priceDesc'}
];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }
  
getProducts(){
  this.shopService.getProducts(this.shopParams).subscribe(response=>{
    this.products=response.data;
    this.shopParams.pageNumber=response.pageIndex;
    this.shopParams.pageSize= response.pageSize;
    this.totalCount=response.count;   
  }, error=>{
          console.log(error);
        });
}
getTypes(){
  this.shopService.getTypes().subscribe(response=>{
    this.types=[{id:0, name:'All'}, ...response ]
  }, error=>{
  console.log(error);
  });
}
getBrands(){
  this.shopService.getBrand().subscribe(response=>{
    this.brands=[{id:0, name:'All'},...response];
  },error=>{
    console.log(error);
  })
}
getBrandIdSelected(brandId:number){
  this.shopParams.brandId=brandId;
  this.shopParams.pageNumber=1;
  this.getProducts();
}
getTypeIdSelected(typeId:number){
  this.shopParams.typeId=typeId;
  this.shopParams.pageNumber=1;
  this.getProducts();
}
onSubmitSortSelected(sort:string){
  this.shopParams.sort=sort;
  this.getProducts();
}
onPageChanged(event:any){
  if(this.shopParams.pageNumber!== event){
this.shopParams.pageNumber=event;
this.getProducts();
  }
}
onSearch(){
  this.shopParams.search= this.searchTerm.nativeElement.value;
  this.shopParams.pageNumber=1;
  this.getProducts();
}
onReset(){
  this.searchTerm.nativeElement.value='';
  this.shopParams= new ShopParams();
  this.getProducts();
}
}
