import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { GavyaSidhListComponent } from './components/gavya-sidh-list/gavya-sidh-list';
import { ProductsListComponent } from './components/products-list/products-list';
import { AddProductsComponent } from './components/add-products/add-products';
import { AddInGauChikishaComponent } from './components/add-in-gau-chikisha/add-in-gau-chikisha';
import { GauChikitshaComponent } from './components/gau-chikitsha/gau-chikitsha';
import { ContactUsComponent } from './components/contact-us/contact-us';
import { RegistrationComponent } from './components/registration/registration';
import { ApproveGSComponent } from './components/approveGS/approveGS';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found';

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home',   component: HomeComponent},
    { path: 'gavyaSidhList', component: GavyaSidhListComponent},
    { path: 'productList', component: ProductsListComponent},
    { path: 'addProducts', component: AddProductsComponent},
    { path: 'gauChikitsha', component: GauChikitshaComponent},
    { path: 'addInGauChikitsha', component: AddInGauChikishaComponent},
    { path: 'contactUs', component: ContactUsComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'approveGS', component: ApproveGSComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
