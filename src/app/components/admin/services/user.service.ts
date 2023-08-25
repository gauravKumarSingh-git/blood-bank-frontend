import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Subject, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { UserRequest } from '../../shared/user-request.model';
import { User } from '../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getByRoleAndPageNoAPI =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/`;

  getHospitalRequest =
  environment.rooturl +
  AppConstants.USER_API_URL +
  `/getUserAndRequestDetails/ROLE_HOSPITAL/pending`;

  getDonorRequest =
  environment.rooturl +
  AppConstants.USER_API_URL +
  `/getUserAndRequestDetails/ROLE_DONOR/pending`;
  
  totalPages: number;
  elementsOnPage: number;

  constructor(private http: HttpClient) { }

  getUsersByRoleAndPageNo(role: string, page: number, sortBy: string){
    return this.http
    .get<{ [key: string]: Object }>(this.getByRoleAndPageNoAPI + `${role}/${page}/${sortBy}`)
    .pipe(
      tap((data) => {
        console.log(data);
        this.totalPages = data['totalPages'] as number;
        if(data['first']){
          this.elementsOnPage = data['numberOfElements'] as number;
        }
      }),
      map((data) => {
        return data['content'] as User[];
      }),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  request = new Subject<UserRequest[]>();
  requestObs$ = this.request.asObservable();

  fetchRequest() {
    this.http.get<UserRequest[]>(this.getHospitalRequest).pipe(
      map((data) => data.sort((a, b) => b.date.localeCompare(a.date))),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      }),
    )
    .subscribe((data) => {
      this.request.next(data);
    });

  }

  donation = new Subject<UserRequest[]>();
  donationObs$ = this.donation.asObservable();

  fetchDonations(){
    this.http.get<UserRequest[]>(this.getDonorRequest).pipe(
      map((data) => data.sort((a, b) => b.date.localeCompare(a.date))),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe((data) => {
      this.donation.next(data);
    });
  }
}
