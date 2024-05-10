import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Parfum3DComponent } from './Components/parfum3-d/parfum3-d.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SponsoringComponent } from './Components/sponsoring/sponsoring.component';
import { GendreComponent } from './Components/gendre/gendre.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductsComponent } from './Components/shop/products/products.component';
import { CollectionComponent } from './Components/shop/collection/collection.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TopCategoriesComponent } from './Components/top-categories/top-categories.component';
import { DashboardComponent } from './Components/admin/dashboard/dashboard.component';
import { OrderBarComponent } from './Components/admin/dashboard/order-bar/order-bar.component';
import { ProductBarComponent } from './Components/admin/dashboard/product-bar/product-bar.component';
import { CategoriesBarComponent } from './Components/admin/dashboard/categories-bar/categories-bar.component';
import { SideBarComponent } from './Components/admin/dashboard/side-bar/side-bar.component';
import { TopBarComponent } from './Components/admin/dashboard/top-bar/top-bar.component';
import { UserBarComponent } from './Components/admin/dashboard/user-bar/user-bar.component';
import { GeneralBarComponent } from './Components/admin/dashboard/general-bar/general-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    Parfum3DComponent,
    MainPageComponent,
    NavBarComponent,
    SponsoringComponent,
    GendreComponent,
    FooterComponent,
    LoginComponent,
    AboutUsComponent,
    ShopComponent,
    ProductsComponent,
    CollectionComponent,
    TopCategoriesComponent,
    DashboardComponent,
    OrderBarComponent,
    ProductBarComponent,
    CategoriesBarComponent,
    SideBarComponent,
    TopBarComponent,
    UserBarComponent,
    GeneralBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
