import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from './auth-gaurd.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'donor',
    canActivate: [AuthGaurd],
    data: { role: 'ROLE_DONOR' },
    loadChildren: () =>
      import('./components/donor/donor.module').then((m) => m.DonorModule),
  },
  {
    path: 'hospital',
    canActivate: [AuthGaurd],
    data: { role: 'ROLE_HOSPITAL' },
    loadChildren: () =>
      import('./components/hospital/hospital.module').then(
        (m) => m.HospitalModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGaurd],
    // canActivate: [true],
    data: { role: 'ROLE_ADMIN' },
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
