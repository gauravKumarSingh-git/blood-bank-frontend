import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { DonorService } from '../../donor/donor.service';
import { User } from '../../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css'],
})
export class HospitalDetailsComponent implements OnInit{
  page: number = 1;
  totalPages: number;
  sortBy: string = 'username';
  // hospital: User;
  updateForm: FormGroup;
  closeResult = '';
  role='ROLE_HOSPITAL';
  hospitals: User[];

  // getHospitalsByRoleAndPageNo =
  //   environment.rooturl +
  //   AppConstants.USER_API_URL +
  //   `/getUsersByRole/${this.role}/${this.page}/${this.sortBy}`;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.userService.getUsersByRoleAndPageNo(this.role, this.page-1, this.sortBy)
      .subscribe(
        (data) => {
          this.hospitals = data;
          this.totalPages = this.userService.totalPages;
          console.log(this.hospitals);
        },
        (error) => console.log(error)
      )
  }

  // hospitals$ = this.http
  //   .get<{ [key: string]: Object }>(this.getHospitalsByRoleAndPageNo)
  //   .pipe(
  //     tap((data) => {
  //       console.log(data);
  //       this.totalPages = data['totalPages'] as number;
  //     }),
  //     map((data) => {
  //       return data['content'] as User[];
  //     }),
  //     catchError(this.handleError)
  //   );

  

  // private handleError(err: HttpErrorResponse): Observable<never> {
  //   let errorMessage: string;
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     errorMessage = `Backend returned code ${err.status}: ${err.message}`;
  //   }
  //   console.error(err);
  //   return throwError(() => errorMessage);
  // }



  open(content: any, hospital: User) {
    console.log(hospital)
    this.updateForm = new FormGroup({
      userId: new FormControl(hospital.userId, [Validators.required]),
      username: new FormControl(hospital.username, [Validators.required]),
      password: new FormControl(hospital.password, [Validators.required]),
      email: new FormControl(hospital.email, [Validators.required]),
      gender: new FormControl(hospital.gender, [Validators.required]),
      state: new FormControl(hospital.state, [Validators.required]),
      city: new FormControl(hospital.city, [Validators.required]),
      address: new FormControl(hospital.address, [Validators.required]),
      dateOfBirth: new FormControl(hospital.dateOfBirth, [Validators.required]),
      phoneNumber: new FormControl(hospital.phoneNumber, [Validators.required]),
      role: new FormControl(hospital.role, [Validators.required]),
      requests: new FormControl(hospital.requests, [Validators.required]),
    });


    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  onSubmit() {
    console.log(this.updateForm.value)
    this.http
      .put(
        environment.rooturl + AppConstants.USER_API_URL + '/updateUser',
        this.updateForm.value,
        { responseType: 'text' }
      )
      .subscribe(
        async (response) => {
          console.log(response);
          this._snackBar.open(response, 'close', { duration: 3000 });
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  previousPage(){
    if(this.page > 1){
      this.page -= 1;
      this.getUsersData();
      // this.donors$ = this.userService.getUsersByRoleAndPageNo(this.role, this.page, this.sortBy);
    }
  }

  nextPage() {
    if(this.page < this.totalPages){
      this.page += 1;
      this.getUsersData();
      // this.donors$ = this.userService.getUsersByRoleAndPageNo(this.role, this.page, this.sortBy);
    }
  }

  onPageChange(pageForm: NgForm){
    if(pageForm.value['page']){
      let requiredPage = pageForm.value['page'];
      if(requiredPage < 1){
        this.page = 1;
        // this.getUsersData();
      }
      else if(requiredPage > this.totalPages){
        this.page = this.totalPages;
        // this.getUsersData();
      }
      else {
        this.page = requiredPage;
        // this.getUsersData();
      }
      this.getUsersData();
      // this.donors$ = this.userService.getUsersByRoleAndPageNo(this.role, this.page, this.sortBy);
    }
    pageForm.reset();
  }
}
