import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { SidenavComponent } from '../sidenav/sidenav.component';


@NgModule({
  declarations: [
    DonorComponent,
  ],
  imports: [
    CommonModule,
    DonorRoutingModule
  ]
})
export class DonorModule { }
