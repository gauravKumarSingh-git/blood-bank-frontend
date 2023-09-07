import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { DonateBloodComponent } from './donate-blood/donate-blood.component';
import { DonationHistoryComponent } from './donation-history/donation-history.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ToastsContainer } from '../shared/toast/toasts-container.component';



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
    NgbDatepickerModule,
    MatSnackBarModule,
    MatIconModule,
    ToastsContainer
  ]
})
export class DonorModule { }
