import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { User } from '../../shared/user.model';
import { DonorService } from '../../donor/donor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit{
  findByUsernameAPI = environment.rooturl + AppConstants.USER_API_URL + '/findByUsername';
  username = localStorage.getItem('username');
  hospital: User;
  hospitalDetails$ = this.donorService.donorDetails$;
  closeResult = '';
  updateForm : FormGroup;

  constructor(private donorService: DonorService, private modalService: NgbModal, private http: HttpClient, private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {

    this.hospitalDetails$.subscribe(
      (data) => {
        this.hospital = data
        this.updateForm = new FormGroup({
          'userId': new FormControl(this.hospital.userId, [Validators.required]),
          'username': new FormControl(this.hospital.username, [Validators.required]),
          'password': new FormControl(this.hospital.password, [Validators.required]),
          'email': new FormControl(this.hospital.email, [Validators.required]),
          'gender': new FormControl(this.hospital.gender, [Validators.required]),
          'state': new FormControl(this.hospital.state, [Validators.required]),
          'city': new FormControl(this.hospital.city, [Validators.required]),
          'address': new FormControl(this.hospital.address, [Validators.required]),
          'dateOfBirth': new FormControl(this.hospital.dateOfBirth, [Validators.required]),
          'phoneNumber': new FormControl(this.hospital.phoneNumber, [Validators.required]),
          'role': new FormControl(this.hospital.role, [Validators.required]),
          'requests': new FormControl(this.hospital.requests, [Validators.required])
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
        this._snackBar.open(response, 'close', { duration: 3000 })
        // let promise = new Promise((resolve, reject) => {
        //   setTimeout(() => resolve("done!"), 1000)
        // });
      
        // let result = await promise;
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
