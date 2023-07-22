import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BloodStockComponent } from './blood-stock/blood-stock.component';
import { DonationsComponent } from './donations/donations.component';
import { DonorDetailsComponent } from './donor-details/donor-details.component';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
import { RequestHistoryComponent } from './request-history/request-history.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'donor-details', component: DonorDetailsComponent},
  { path: 'hospital-details', component: HospitalDetailsComponent},
  { path: 'request-history', component: RequestHistoryComponent},
  { path: 'donations', component: DonationsComponent},
  { path: 'requests', component: RequestsComponent},
  { path: 'blood-stock', component: BloodStockComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
