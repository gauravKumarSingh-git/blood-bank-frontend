import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../shared/user-request.model';

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

  constructor(private http: HttpClient) {}

  donations$ = this.http.get<UserRequest[]>(this.getUserRequest).pipe(
    tap((data) => { 
      console.log(data);
    }),
    catchError(error => {
      console.log(error);
      return EMPTY;
    })
  );

 
}
