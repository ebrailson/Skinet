import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';

const route:Routes=[
    {path:'', component:ShopComponent},
    {path:':id', component:ProductDetailsComponent, data: {breadcrumb: {alias:'productDetails'}}},
  ];
 
  @NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(route)
  ],
  exports:[RouterModule]
})
export class ShopRoutingModule { }
