import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, combineLatest, map, Observable, tap, throwError} from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../shared/user-request.model';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestHistoryComponent {

  getUserAndRequestDetails =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUserAndRequestByStatus`;

  constructor(private http: HttpClient) {}

  acceptedRequests$ = this.http.get<UserRequest[]>(this.getUserAndRequestDetails + "/accepted").pipe(
    tap((data) => { 
      console.log(data);
    }),
    catchError(this.handleError)
  );

  rejectedRequests$ = this.http.get<UserRequest[]>(this.getUserAndRequestDetails + "/rejected").pipe(
    tap((data) => { 
      console.log(data);
    }),
    catchError(this.handleError)
  );

  requests$ = combineLatest([
    this.acceptedRequests$,
    this.rejectedRequests$
  ]).pipe(
    map(([accepted, rejected]) => {
      return [...accepted, ...rejected];
    })
  )

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
