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
import * as moment from 'moment';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css'],
})
export class DonorDetailsComponent implements OnInit{
  page: number = 1;
  totalPages: number;
  elementsOnPage: number;
  closeResult = '';
  updateForm: FormGroup;
  role='ROLE_DONOR'
  donors: User[];
  maxDate = moment(new Date()).subtract(8, 'years').format('YYYY-MM-DD');
  direction= new BehaviorSubject<string>('asc');
  sortBy = new BehaviorSubject<string>('username');
  searchForm: FormGroup;

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
    this.searchForm = new FormGroup({
      'username': new FormControl(null)
    })
  }

  getUsersData() {
    combineLatest(
      this.userService.getUsersByRoleAndPageNo(this.role, this.page-1, this.sortBy.getValue()),
      this.direction,
      this.sortBy
    ).pipe(
      map(([users, direction, sortBy]) => {
        return users.sort((a, b) => {
          if(sortBy === 'username' && direction === 'desc'){
            return b.username.localeCompare(a.username);
          }
          return a.username.localeCompare(b.username);
        })
      }) 
    ).subscribe(
          (data) => {
            this.donors = data;
            this.totalPages = this.userService.totalPages;
            this.elementsOnPage = this.userService.elementsOnPage;
            console.log(this.donors);
          },
          (error) => console.log(error)
        )
    
    // this.userService.getUsersByRoleAndPageNo(this.role, this.page-1, this.sortBy.getValue())
    //   .subscribe(
    //     (data) => {
    //       this.donors = data;
    //       this.totalPages = this.userService.totalPages;
    //       this.elementsOnPage = this.userService.elementsOnPage;
    //       console.log(this.donors);
    //     },
    //     (error) => console.log(error)
    //   )
  }

  open(content: any, donor: User) {
    this.updateForm = new FormGroup({
      userId: new FormControl(donor.userId, [Validators.required]),
      username: new FormControl(donor.username, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      password: new FormControl(donor.password, [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
      email: new FormControl(donor.email, [Validators.required, Validators.email, Validators.maxLength(40)]),
      gender: new FormControl(donor.gender, [Validators.required]),
      state: new FormControl(donor.state, [Validators.required]),
      city: new FormControl(donor.city, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]),
      address: new FormControl(donor.address, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.maxLength(30)]),
      dateOfBirth: new FormControl(donor.dateOfBirth, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(donor.phoneNumber, [
        Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999),
      ]),
      role: new FormControl(donor.role, [Validators.required]),
      requests: new FormControl(donor.requests),
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  sortByField(field: string) {
    // console.log('sort by ' + field);
    if(this.sortBy.getValue() === field){
      if(this.direction.getValue() === 'asc'){
        this.direction.next('desc');
      }else {
        this.direction.next('asc');
      }
    }else {
      this.sortBy.next(field);
      this.direction.next('asc')
    }
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
          // let promise = new Promise((resolve, reject) => {
          //   setTimeout(() => resolve(location.reload()), 1000);
          // });
          this.getUsersData();
          
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

  onSearch() {
    // console.log(this.searchForm);
    if(this.searchForm.value.username){
      this.http.get<User[]>(environment.rooturl + AppConstants.USER_API_URL + '/getLikeUsername/' + this.searchForm.value.username)
      .subscribe(
        (data) => {
          this.donors = data;
          this.totalPages = 1;
          this.page = 1;
        },
        (error) => console.log(error)
      )
    }
  }

  clearSearch() {
    this.getUsersData();
    this.searchForm.reset();
  }
}
