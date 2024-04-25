import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductsComponent } from './Components/shop/products/products.component';
import { CollectionComponent } from './Components/shop/collection/collection.component';

const routes: Routes = [
  { path:'',redirectTo: 'main', pathMatch: 'full'},
  { path:'main', component:MainPageComponent},
  { path:'login', component:LoginComponent},
  { path:'aboutus', component:AboutUsComponent},
  { path:'shop', component:ShopComponent,
    children:[
      {path: '' , component: CollectionComponent},
      {path: 'products' , component: ProductsComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
