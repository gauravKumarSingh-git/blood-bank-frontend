import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DonorDetailsComponent } from './donor-details/donor-details.component';
import { MatListModule } from '@angular/material/list';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { DonationsComponent } from './donations/donations.component';
import { RequestsComponent } from './requests/requests.component';
import { BloodStockComponent } from './blood-stock/blood-stock.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AdminComponent,
    DonorDetailsComponent,
    HospitalDetailsComponent,
    RequestHistoryComponent,
    DonationsComponent,
    RequestsComponent,
    BloodStockComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule
  ]
})
export class AdminModule { }
