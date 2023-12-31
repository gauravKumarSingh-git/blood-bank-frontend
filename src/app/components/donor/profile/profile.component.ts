import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { SnackbarService } from '../../shared/snackbar.service';
import { ToastService } from '../../shared/toast/toast.service';
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
  maxDate = moment(new Date()).subtract(8, 'years').format('YYYY-MM-DD')

  constructor(private donorService: DonorService, 
    private modalService: NgbModal, 
    private http: HttpClient, 
    private snackbarService: SnackbarService,
    private toastService: ToastService) {}
  
  ngOnInit(): void {

    this.donorDetails$.subscribe(
      (data) => {
        this.donor = data
        this.updateForm = new FormGroup({
          'userId': new FormControl(this.donor.userId, [Validators.required]),
          'username': new FormControl(this.donor.username, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
          'password': new FormControl(this.donor.password, [Validators.required]),
          'email': new FormControl(this.donor.email, [Validators.required, Validators.email, Validators.maxLength(20)]),
          'gender': new FormControl(this.donor.gender, [Validators.required]),
          'state': new FormControl(this.donor.state, [Validators.required]),
          'city': new FormControl(this.donor.city, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]),
          'address': new FormControl(this.donor.address, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.maxLength(30)]),
          'dateOfBirth': new FormControl(this.donor.dateOfBirth, [Validators.required]),
          'phoneNumber': new FormControl(this.donor.phoneNumber, [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]),
          'role': new FormControl(this.donor.role, [Validators.required]),
          'requests': new FormControl(this.donor.requests)
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
        // this.toastService.show('successfully updated', { classname: 'bg-success text-light', delay: 2000 });
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
