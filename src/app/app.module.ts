import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router'
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';

import {DbService} from "./services/db.service";
import {ApiService} from "./services/api.service";
import {AuthComponent} from './auth/auth.component'
import {MainMenuComponent} from "./mainMenu.component";
import {StaffersComponent} from "./staffers/staffers.component";
import {StafferComponent} from "./staffers/staffer.component";
import { DiscountCardsComponent } from './discount-card/discount-cards.component';
import { DiscountCardComponent } from './discount-card/discount-card.component';
import { ServicesComponent } from './service/services.component';
import {ServiceComponent} from "./service/service.component";
import {MaterialsComponent} from "./material/materials.component";
import {MaterialComponent} from "./material/material.component";
import {PurchasesComponent} from "./purchase/purchases.component";
import {PurchaseComponent} from "./purchase/purchase.component";
import {MyDatePipe} from "./services/MyDatePipe";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {OrdersComponent} from "./order/orders.component";
import {OrderComponent} from "./order/order.component";
import {ExecutedWorksComponent} from "./reports/executed_works.component";
import {MaterialsUsingComponent} from "./reports/materials_using.component";
import {SalaryComponent} from "./reports/salary.component";

const routs: Routes = [
  {path: '', component: AuthComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'mainMenu', component: MainMenuComponent},
  {path: 'staffers', component: StaffersComponent},
  {path: 'staffer/:id', component: StafferComponent},
  {path: 'discount-cards', component: DiscountCardsComponent},
  {path: 'discount-card/:id', component: DiscountCardComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'service/:id', component: ServiceComponent},
  {path: 'materials', component: MaterialsComponent},
  {path: 'material/:id', component: MaterialComponent},
  {path: 'purchases', component: PurchasesComponent},
  {path: 'purchase/:id', component: PurchaseComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'order/:id', component: OrderComponent},
  {path: 'executed_works', component: ExecutedWorksComponent},
  {path: 'materials_using', component: MaterialsUsingComponent},
  {path: 'salary', component: SalaryComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainMenuComponent,
    StaffersComponent,
    StafferComponent,
    DiscountCardsComponent,
    DiscountCardComponent,
    ServicesComponent,
    ServiceComponent,
    MaterialsComponent,
    MaterialComponent,
    PurchasesComponent,
    PurchaseComponent,
    OrdersComponent,
    OrderComponent,
    ExecutedWorksComponent,
    MaterialsUsingComponent,
    SalaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routs),
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [DbService, ApiService, MyDatePipe, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
