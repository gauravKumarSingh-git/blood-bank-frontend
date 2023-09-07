import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalRoutingModule } from './hospital-routing.module';
import { HospitalComponent } from './hospital.component';
import { RequestComponent } from './request/request.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ToastsContainer } from '../shared/toast/toasts-container.component';



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
    MatSnackBarModule,
    MatIconModule,
    ToastsContainer
  ]
})
export class HospitalModule { }
