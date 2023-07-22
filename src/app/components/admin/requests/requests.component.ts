import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../shared/user-request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsComponent {

  getUserRequest =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUserAndRequestDetails/ROLE_HOSPITAL/pending`;

  constructor(private http: HttpClient) {}

  requests$ = this.http.get<UserRequest[]>(this.getUserRequest).pipe(
    tap((data) => { 
      console.log(data);
    }),
    catchError(error => {
      console.log(error);
      return EMPTY;
    })
  );

}
