import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AppConstants } from 'src/app/constants/app.constants';
import { User } from '../../shared/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from '../../shared/snackbar.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css'],
})
export class DonorDetailsComponent implements OnInit{
  page: number = 1;
  totalPages: number;
  elementsOnPage: number;
  sortBy: string = 'username';
  closeResult = '';
  updateForm: FormGroup;
  role='ROLE_DONOR'
  donors: User[];

  getDonorsByRoleAndPageNo =
    environment.rooturl +
    AppConstants.USER_API_URL +
    `/getUsersByRole/${this.role}/${this.page}/${this.sortBy}`;

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private userService: UserService,
    private toastService: ToastService
  ) {}


  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.userService.getUsersByRoleAndPageNo(this.role, this.page-1, this.sortBy)
      .subscribe(
        (data) => {
          this.donors = data;
          this.totalPages = this.userService.totalPages;
          this.elementsOnPage = this.userService.elementsOnPage;
          console.log(this.donors);
        },
        (error) => console.log(error)
      )
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
          this.toastService.show(response, { classname: 'bg-success text-light', delay: 2000 });
          let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(location.reload()), 1000);
          });

          let result = await promise;
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
    }
  }

  nextPage() {
    if(this.page < this.totalPages){
      this.page += 1;
      this.getUsersData();
    }
  }

  onPageChange(pageForm: NgForm){
    if(pageForm.value['page']){
      let requiredPage = pageForm.value['page'];
      if(requiredPage < 1){
        this.page = 1;
      }
      else if(requiredPage > this.totalPages){
        this.page = this.totalPages;
      }
      else {
        this.page = requiredPage;
      }
      this.getUsersData();
    }
    pageForm.reset();
  }
}
