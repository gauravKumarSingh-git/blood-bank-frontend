import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, combineLatest, map, Observable, Subject, tap, throwError} from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../../shared/user-request.model';
import * as XLSX from 'xlsx'; 

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

  // sortBy= new BehaviorSubject<string>('username');
  // direction= new BehaviorSubject<string>('asc');
  // private sortByObs = this.sortBy.asObservable();
  // private dirObs = this.direction.asObservable();
  

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
    }),
    map((request) => request.sort((a, b) => b.date.localeCompare(a.date)))
  )

  // sortedRequests$ = combineLatest([
  //   this.requests$,
  //   this.sortByObs,
  //   this.dirObs
  // ])
 

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

  generateReport() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'RequestHistory.xlsx');
  }

  sortByUsername(){
    
  }
}
