import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/models/products';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
product:IProduct;
  constructor(private shopService: ShopService, private activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct(){
    return this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data=>{
      this.product=data;
    }),
    error=>{
      console.log(error);
    }
  }

}
