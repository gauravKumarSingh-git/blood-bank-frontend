import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { SnackbarService } from '../../shared/snackbar.service';
import { User } from '../../shared/user.model';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit{

  findByUsernameAPI = environment.rooturl + AppConstants.USER_API_URL + '/findByUsername';
  username = localStorage.getItem('username');
  donor: User;
  donorDetails$ = this.donorService.donorDetails$;
  closeResult = '';
  updateForm : FormGroup;

  constructor(private donorService: DonorService, 
    private modalService: NgbModal, 
    private http: HttpClient, 
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService) {}
  
  ngOnInit(): void {

    this.donorDetails$.subscribe(
      (data) => {
        this.donor = data
        this.updateForm = new FormGroup({
          'userId': new FormControl(this.donor.userId, [Validators.required]),
          'username': new FormControl(this.donor.username, [Validators.required]),
          'password': new FormControl(this.donor.password, [Validators.required]),
          'email': new FormControl(this.donor.email, [Validators.required]),
          'gender': new FormControl(this.donor.gender, [Validators.required]),
          'state': new FormControl(this.donor.state, [Validators.required]),
          'city': new FormControl(this.donor.city, [Validators.required]),
          'address': new FormControl(this.donor.address, [Validators.required]),
          'dateOfBirth': new FormControl(this.donor.dateOfBirth, [Validators.required]),
          'phoneNumber': new FormControl(this.donor.phoneNumber, [Validators.required]),
          'role': new FormControl(this.donor.role, [Validators.required]),
          'requests': new FormControl(this.donor.requests, [Validators.required])
        })
      }
    )

    
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			}
		);
	}

  onSubmit(){
    console.log(this.updateForm.value);
    this.http.put(environment.rooturl + AppConstants.USER_API_URL + "/updateUser",
      this.updateForm.value,
      { responseType: 'text' }
    ).subscribe(
      async (response) => {
        console.log(response);
        this.snackbarService.showSnackbarMessage(response);
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve( location.reload()), 2000)
        });
          
        let result = await promise;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
