import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DonorComponent,
    DonateBloodComponent,
    DonationHistoryComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    DonorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule
  ]
})
export class DonorModule { }
