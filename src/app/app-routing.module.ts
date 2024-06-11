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
import { PromoCodeBarComponent } from './Components/admin/dashboard/promoCode-bar/promoCode-bar.component';
import { OrderBarComponent } from './Components/admin/dashboard/order-bar/order-bar.component';
import { UserBarComponent } from './Components/admin/dashboard/user-bar/user-bar.component';
import { ContactBarComponent } from './Components/admin/dashboard/contact-bar/contact-bar.component';
import { GeneralBarComponent } from './Components/admin/dashboard/general-bar/general-bar.component';
import { PaymentComponent } from './payment/payment.component';
import { IsAuthenticatedGuard } from './Guards/is-authenticated.guard';
import { HasRoleGuard } from './Guards/has-role.guard';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { AddressComponent } from './Components/checkout/address/address.component';
import { TrackOrderComponent } from './Components/track-order/track-order.component';
import { BrandBarComponent } from './Components/admin/dashboard/brand-bar/brand-bar.component';
import { CategoryBarComponent } from './Components/admin/dashboard/category-bar/category-bar.component';

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
  { path: 'admin' , component:DashboardComponent ,

  children:[
    {path: 'products' , component: ProductBarComponent},
    { path: 'promocodes' , component: PromoCodeBarComponent },
    { path: 'Resrvations' , component:OrderBarComponent  },
    { path: 'users' , component:UserBarComponent  },
    { path: 'Contacts' , component:ContactBarComponent  },
    { path: 'category' , component:CategoryBarComponent  },
    { path: 'brand' , component:BrandBarComponent  },
    { path: '' , component:GeneralBarComponent  },
  ],
  canActivate:[HasRoleGuard],
  data:{
    role:'admin',
  }
},
{ path: 'payment' , component:PaymentComponent},
{ path: 'cart', component: CartComponent },
{ path: 'checkout' , component: CheckoutComponent,
  children:[
    {path: 'address' , component: AddressComponent},
  ],
  canActivate:[IsAuthenticatedGuard],
  data:{
    role:'user',
  }
},
{ path: 'track', component: TrackOrderComponent,
  canActivate:[IsAuthenticatedGuard],
  data:{
    role:'user',
  } 
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
