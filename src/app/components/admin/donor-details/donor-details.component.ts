import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AppConstants } from 'src/app/constants/app.constants';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../../shared/user.model';
import { DonorService } from '../../donor/donor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../shared/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonorDetailsComponent {
  page: number = 0;
  totalPages: number;
  sortBy: string = 'username';
  donorDetails$ = this.donorService.donorDetails$;
  closeResult = '';
  updateForm: FormGroup;

  getDonorsByRoleAndPageNo =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/ROLE_DONOR/${this.page}/${this.sortBy}`;

  constructor(
    private donorService: DonorService,
    private modalService: NgbModal,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

  donors$ = this.http
    .get<{ [key: string]: Object }>(this.getDonorsByRoleAndPageNo)
    .pipe(
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

  open(content: any, donor: User) {
    this.updateForm = new FormGroup({
      userId: new FormControl(donor.userId, [Validators.required]),
      username: new FormControl(donor.username, [Validators.required]),
      password: new FormControl(donor.password, [Validators.required]),
      email: new FormControl(donor.email, [Validators.required]),
      gender: new FormControl(donor.gender, [Validators.required]),
      state: new FormControl(donor.state, [Validators.required]),
      city: new FormControl(donor.city, [Validators.required]),
      address: new FormControl(donor.address, [Validators.required]),
      dateOfBirth: new FormControl(donor.dateOfBirth, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(donor.phoneNumber, [
        Validators.required,
      ]),
      role: new FormControl(donor.role, [Validators.required]),
      requests: new FormControl(donor.requests, [Validators.required]),
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  onSubmit() {
    console.log(this.updateForm.value);
    this.http
      .put(
        environment.rooturl + AppConstants.USER_API_URL + '/updateUser',
        this.updateForm.value,
        { responseType: 'text' }
      )
      .subscribe(
        async (response) => {
          console.log(response);
          this.snackbarService.showSnackbarMessage(response);
          let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(location.reload()), 2000);
          });

          let result = await promise;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
