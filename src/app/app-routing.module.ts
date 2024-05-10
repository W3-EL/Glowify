import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductsComponent } from './Components/shop/products/products.component';
import { CollectionComponent } from './Components/shop/collection/collection.component';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { ProductBarComponent } from './Components/admin/dashboard/product-bar/product-bar.component';
import { CategoriesBarComponent } from './Components/admin/dashboard/categories-bar/categories-bar.component';
import { OrderBarComponent } from './Components/admin/dashboard/order-bar/order-bar.component';
import { UserBarComponent } from './Components/admin/dashboard/user-bar/user-bar.component';
import { ContactBarComponent } from './Components/admin/dashboard/contact-bar/contact-bar.component';
import { GeneralBarComponent } from './Components/admin/dashboard/general-bar/general-bar.component';

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
  },
  { path: 'admin' , component:DashboardComponent,
  children:[
    {path: 'products' , component: ProductBarComponent},
    { path: 'categories' , component: CategoriesBarComponent },
    { path: 'Resrvations' , component:OrderBarComponent  },
    { path: 'users' , component:UserBarComponent  },
    { path: 'Contacts' , component:ContactBarComponent  },
    { path: '' , component:GeneralBarComponent  },
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
