import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AppConstants } from 'src/app/constants/app.constants';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonorDetailsComponent {
  page: number = 0;
  totalPages: number;
  sortBy: string = 'username';

  getDonorsByRoleAndPageNo =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/ROLE_DONOR/${this.page}/${this.sortBy}`;

  constructor(private http: HttpClient) {}

  donors$ = this.http.get<{[key: string] : Object }>(this.getDonorsByRoleAndPageNo).pipe(
    tap((data) => { 
      console.log(data);
      this.totalPages = data['totalPages'] as number;
    }),
    map((data) => {
      return data['content'] as User[];
    }),
    catchError(this.handleError)
  );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
