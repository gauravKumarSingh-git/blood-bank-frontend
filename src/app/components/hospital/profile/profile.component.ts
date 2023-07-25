import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { User } from '../../shared/user.model';
import { DonorService } from '../../donor/donor.service';

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

  constructor(private donorService: DonorService, private modalService: NgbModal, private http: HttpClient) {}
  
  ngOnInit(): void {

    this.hospitalDetails$.subscribe(
      (data) => {
        this.hospital = data
        this.updateForm = new FormGroup({
          'email': new FormControl(this.hospital.email, [Validators.required]),
          'state': new FormControl(this.hospital.state, [Validators.required]),
          'city': new FormControl(this.hospital.city, [Validators.required]),
          'address': new FormControl(this.hospital.address, [Validators.required]),
          'phoneNumber': new FormControl(this.hospital.phoneNumber, [Validators.required]),
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
