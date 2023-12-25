import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
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
  elementsOnPage: number;
  updateForm: FormGroup;
  closeResult = '';
  role='ROLE_HOSPITAL';
  hospitals: User[];
  direction= new BehaviorSubject<string>('asc');
  sortBy = new BehaviorSubject<string>('username');
  searchForm: FormGroup;

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
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
            this.hospitals = data;
            this.totalPages = this.userService.totalPages;
            this.elementsOnPage = this.userService.elementsOnPage;
            // console.log(this.donors);
          },
          (error) => console.log(error)
        )
    // this.userService.getUsersByRoleAndPageNo(this.role, this.page-1, this.sortBy)
    //   .subscribe(
    //     (data) => {
    //       this.hospitals = data;
    //       this.totalPages = this.userService.totalPages;
    //       console.log(this.hospitals);
    //     },
    //     (error) => console.log(error)
    //   )
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


  open(content: any, hospital: User) {
    console.log(hospital)
    this.updateForm = new FormGroup({
      userId: new FormControl(hospital.userId, [Validators.required]),
      username: new FormControl(hospital.username, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
      password: new FormControl(hospital.password, [Validators.required, Validators.minLength(8), Validators.maxLength(60)]),
      email: new FormControl(hospital.email, [Validators.required, Validators.email, Validators.maxLength(20)]),
      gender: new FormControl(hospital.gender),
      state: new FormControl(hospital.state, [Validators.required]),
      city: new FormControl(hospital.city, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(20)]),
      address: new FormControl(hospital.address, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$'), Validators.maxLength(30)]),
      dateOfBirth: new FormControl(hospital.dateOfBirth),
      phoneNumber: new FormControl(hospital.phoneNumber, [Validators.required, Validators.min(1000000000),Validators.max(9999999999)]),
      role: new FormControl(hospital.role, [Validators.required]),
      requests: new FormControl(hospital.requests),
    });


    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
  }

  onSubmit() {
    // console.log(this.updateForm.value)
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
    if(this.searchForm.value.username){
      this.http.get<User[]>(environment.rooturl + AppConstants.USER_API_URL + '/getLikeUsername/' + this.searchForm.value.username)
      .subscribe(
        (data) => {
          this.hospitals = data;
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

