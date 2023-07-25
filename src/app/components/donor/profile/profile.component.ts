import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
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

  constructor(private donorService: DonorService, private modalService: NgbModal, private http: HttpClient) {}
  
  ngOnInit(): void {

    this.donorDetails$.subscribe(
      (data) => {
        this.donor = data
        this.updateForm = new FormGroup({
          'email': new FormControl(this.donor.email, [Validators.required]),
          'gender': new FormControl(this.donor.gender, [Validators.required]),
          'state': new FormControl(this.donor.state, [Validators.required]),
          'city': new FormControl(this.donor.city, [Validators.required]),
          'address': new FormControl(this.donor.address, [Validators.required]),
          'dateOfBirth': new FormControl(this.donor.dateOfBirth, [Validators.required]),
          'phoneNumber': new FormControl(this.donor.phoneNumber, [Validators.required]),
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

    // modal.close('Save click');
  }

}
