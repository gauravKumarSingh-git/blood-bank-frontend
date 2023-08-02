import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { User } from '../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getByRoleAndPageNoAPI =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/`;
  
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
}
