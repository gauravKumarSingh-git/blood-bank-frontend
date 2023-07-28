import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../../shared/user-request.model';
import { AuthService } from 'src/app/auth.service';
import { SnackbarService } from '../../shared/snackbar.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsComponent {
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

  constructor(private http: HttpClient, private authService: AuthService, private snackbarService: SnackbarService) {}

  requests$ = this.http.get<UserRequest[]>(this.getUserRequest).pipe(
    tap((data) => {
      console.log(data);
    }),
    map((data) => data.sort((a, b) => b.date.localeCompare(a.date))),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

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
              this.successMessage = 'Request Accepted'
              location.reload();
              this.authService.login();
            },
            (error) => console.log(error)
          );
      },
      (error) => {
        console.log(error)
        if(error.status === 400){
          this.snackbarService.showSnackbarMessage("Not enough quantity present");
          // this.errorMessage = 'Not Enough quantity present';
        }
        else {
          this.errorMessage = error.message;
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
          this.successMessage='Request Rejected';
          location.reload();
          this.authService.login();
        },
        (error) => console.log(error)
      );
  }
}
