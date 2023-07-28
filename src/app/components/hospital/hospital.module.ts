import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';
import { RequestComponent } from './request/request.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    HospitalComponent,
    RequestComponent,
    HistoryComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class HospitalModule { }
