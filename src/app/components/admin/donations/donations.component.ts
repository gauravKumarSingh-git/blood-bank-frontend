import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { ToastService } from '../../shared/toast/toast.service';
import { UserRequest } from '../../shared/user-request.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationsComponent {
  getUserRequest =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUserAndRequestDetails/ROLE_DONOR/pending`;

  changeQuantityAPI =
    environment.rooturl + AppConstants.BLOOD_GROUP_API_URL + `/changeQuantity`;

  updateStatusAPI =
    environment.rooturl + AppConstants.REQUEST_API_URL + `/updateStatus`;

  successMessage = '';
  errorMessage = '';

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService) {
      this.userService.fetchDonations();
    }

  // donations$ = this.http.get<UserRequest[]>(this.getUserRequest).pipe(
  //   tap((data) => {
  //     console.log(data);
  //   }),
  //   map((data) => data.sort((a, b) => b.date.localeCompare(a.date))),
  //   catchError((error) => {
  //     console.log(error);
  //     return EMPTY;
  //   })
  // );
  donations$ = this.userService.donationObs$;

  onAccept(request: UserRequest) {
    this.http
      .patch(
        `${this.changeQuantityAPI}/${request.bloodGroup}/${+request.quantity}`,
        null,
        { responseType: 'text' }
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.http
            .patch(
              `${this.updateStatusAPI}/${request.requestId}/accepted`,
              null,
              { responseType: 'text' }
            )
            .subscribe(
              (response) => {
                console.log(response);
                this.toastService.show('Request Accepted', { classname: 'bg-success text-light', delay: 3000 });
                this.userService.fetchDonations();
                // this.successMessage = 'Request Accepted';
                // location.reload();
                // this.authService.login();
              },
              (error) => console.log(error)
            );
        },
        (error) => {
          console.log(error);
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 3000 });
        }
      );
  }

  onReject(request: UserRequest) {
    this.http
      .patch(`${this.updateStatusAPI}/${request.requestId}/rejected`, null, {
        responseType: 'text',
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.toastService.show('Request Rejected', { classname: 'bg-danger text-light', delay: 3000 });
          this.userService.fetchDonations();
          // this.successMessage = 'Request Rejected';
          // location.reload();
          // this.authService.login();
        },
        (error) => console.log(error)
      );
  }
}
