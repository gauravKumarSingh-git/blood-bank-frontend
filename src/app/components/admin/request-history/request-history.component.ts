import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, startWith, Subject, tap, throwError} from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../../shared/user-request.model';
import * as XLSX from 'xlsx'; 
import { FormControl, FormGroup, NgForm } from '@angular/forms';

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

  searchByUsername= new BehaviorSubject<string>('');
  direction= new BehaviorSubject<string>('desc');
  sortBy = new BehaviorSubject<string>('date');

  searchForm: FormGroup = new FormGroup({
    'username': new FormControl(null)
  });
  
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
    this.rejectedRequests$, 
    this.searchByUsername,
    this.sortBy,
    this.direction
  ])
  .pipe(
    map(([accepted, rejected]) => {
      return [...accepted, ...rejected];
    }),
    map((request) =>{
      let username = this.searchByUsername.getValue().trim().toLowerCase();
      if(username){
        return request.filter((req) => req.username.toLowerCase().includes(username));
      }else {
        return request;
      }
    }
    ),
    map((request) => {
      let field = this.sortBy.getValue();
      let dir = this.direction.getValue();
      // return request.sort((a, b) => b.date.localeCompare(a.date))
      return request.sort((a, b) => {
        if(field === 'username' && dir === 'desc'){
          return b.username.localeCompare(a.username);
        }else if(field === 'username' && dir === 'asc'){
          return a.username.localeCompare(b.username);
        }else if(field === 'date' && dir === 'desc'){
          return b.date.localeCompare(a.date);
        }else if(field === 'date' && dir === 'asc'){
          return a.date.localeCompare(b.date);
        }else if(field === 'quantity' && dir === 'desc'){
          return (+b.quantity) - (+a.quantity);
        }else {
          return (+a.quantity) - (+b.quantity);
        }
      })
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

  generateReport() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'RequestHistory.xlsx');
  }

  // sortByUsername(){
  //   console.log('sort by username');
  //   if(this.sortBy.getValue() === 'username'){
  //     this.direction.next('asc');
  //   }else{
  //     this.sortBy.next('username');
  //   }
  // }

  // sortByDate(){
  //   console.log('sort by date');
  //   if(this.sortBy.getValue() === 'username'){
  //     this.direction.next('asc');
  //   }else{
  //     this.sortBy.next('username');
  //   }
  // }

  sortByField(field: string) {
    console.log('sort by ' + field);
    if(this.sortBy.getValue() === field){
      if(this.direction.getValue() === 'asc'){
        this.direction.next('desc');
      }else {
        this.direction.next('asc');
      }
    }else {
      this.sortBy.next(field);
      this.direction.next('asc')
    }
  }

  onSearchFormSubmit(form: FormGroup) {
    this.searchByUsername.next(form.value.username)
  }
  
  search(){
    this.searchByUsername.next(this.searchForm.value.username)

  }
  clearSearch(){
    this.searchByUsername.next('');
    this.searchForm.reset();
  }
}
