import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DonorDetailsComponent } from './donor-details/donor-details.component';
import { MatListModule } from '@angular/material/list'



@NgModule({
  declarations: [
    AdminComponent,
    DonorDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatListModule,
  ]
})
export class AdminModule { }
