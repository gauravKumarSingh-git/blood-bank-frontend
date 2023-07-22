import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HospitalDetailsComponent {
  page: number = 0;
  totalPages: number;
  sortBy: string = 'username';

  getHospitalsByRoleAndPageNo =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/ROLE_HOSPITAL/${this.page}/${this.sortBy}`;

  constructor(private http: HttpClient) {}

  hospitals$ = this.http.get<{[key: string] : Object }>(this.getHospitalsByRoleAndPageNo).pipe(
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
