import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../../shared/user-request.model';
import { AuthService } from 'src/app/auth.service';
import { SnackbarService } from '../../shared/snackbar.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ToastsContainer } from '../../shared/toast/toasts-container.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsComponent{
  getUserRequest =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUserAndRequestDetails/ROLE_HOSPITAL/pending`;

  changeQuantityAPI =
    environment.rooturl + AppConstants.BLOOD_GROUP_API_URL + `/changeQuantity`;

  updateStatusAPI =
    environment.rooturl + AppConstants.REQUEST_API_URL + `/updateStatus`;

  successMessage=''
  errorMessage=''

  constructor(private http: HttpClient, 
    private userService: UserService,
    private toastService: ToastService) {
      this.userService.fetchRequest();
    }

  // requests$ = this.http.get<UserRequest[]>(this.getUserRequest).pipe(
  //   tap((data) => {
  //     console.log(data);
  //   }),
  //   map((data) => data.sort((a, b) => b.date.localeCompare(a.date))),
  //   catchError((error) => {
  //     console.log(error);
  //     return EMPTY;
  //   })
  // );

  requests$ = this.userService.requestObs$;
  

  onAccept(request: UserRequest) {
    this.http
      .patch(
        `${this.changeQuantityAPI}/${request.bloodGroup}/${-request.quantity}`,
        null,
        { responseType: 'text' }
      )
      .subscribe((response) => {
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
              this.userService.fetchRequest();
              // this.authService.login();
            },
            (error) => console.log(error)
          );
      },
      (error) => {
        console.log(error)
        if(error.status === 400){
          this.toastService.show('Not enough quantity present', { classname: 'bg-danger text-light', delay: 3000 });
        }
        else {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 3000 });
        }
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
          this.userService.fetchRequest();
          // this.authService.login();
        },
        (error) => console.log(error)
      );
  }
}
