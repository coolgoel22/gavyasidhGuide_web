import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Pipes...
import { SearchPipe } from './pipes/search.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
// import { KeysPipe } from './pipes/keysPipe';

// Components
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './components/home/home';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { AddInGauChikishaComponent } from './components/add-in-gau-chikisha/add-in-gau-chikisha';
import { ApproveGSComponent } from './components/approveGS/approveGS';
import { GauChikitshaComponent } from './components/gau-chikitsha/gau-chikitsha';

// Services
import { DataService } from './service/data.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login';
import { GavyaSidhListComponent } from './components/gavya-sidh-list/gavya-sidh-list';
import { ProductsListComponent } from './components/products-list/products-list';
import { AddProductsComponent } from './components/add-products/add-products';
import { ContactUsComponent } from './components/contact-us/contact-us';
import { RegistrationComponent } from './components/registration/registration';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    ActionBarComponent,
    LoginComponent,
    SearchPipe,
    GavyaSidhListComponent,
    ApproveGSComponent,
    ProductsListComponent,
    AddProductsComponent,
    AddInGauChikishaComponent,
    GauChikitshaComponent,
    ContactUsComponent,
    RegistrationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2OrderModule
  ],
  providers: [
    DataService,
    CookieService
  ],
  exports: [SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

