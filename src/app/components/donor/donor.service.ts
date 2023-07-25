import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, shareReplay, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  findByUsernameAPI = environment.rooturl + AppConstants.USER_API_URL + '/findByUsername';
  username = localStorage.getItem('username');
  
  constructor(private http: HttpClient) {}

  donorDetails$ = this.http.get<User>(`${this.findByUsernameAPI}/${this.username}`)
    .pipe(
      tap(data => console.log(data)),
      catchError(error => {
        console.log(error);
        return EMPTY;
      }),
    );


}
