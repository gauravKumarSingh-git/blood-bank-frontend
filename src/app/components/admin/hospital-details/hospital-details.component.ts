import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { ToastService } from '../../shared/toast/toast.service';
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
  updateForm: FormGroup;
  closeResult = '';
  role='ROLE_HOSPITAL';
  hospitals: User[];

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
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
          this.hospitals = data;
          this.totalPages = this.userService.totalPages;
          console.log(this.hospitals);
        },
        (error) => console.log(error)
      )
  }


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
          this.toastService.show(response, { classname: 'bg-success text-light', delay: 2000 });
          let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(location.reload()), 1000);
          });
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
