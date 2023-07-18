import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DonorDetailsComponent } from './donor-details/donor-details.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'donor-details', component: DonorDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
