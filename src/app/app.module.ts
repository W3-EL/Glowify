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
@NgModule({
  declarations: [
    AppComponent,
    Parfum3DComponent,
    MainPageComponent,
    NavBarComponent,
    SponsoringComponent,
    GendreComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
