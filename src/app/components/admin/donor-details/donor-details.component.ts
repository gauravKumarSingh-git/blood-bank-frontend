import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Donor } from './donor.model';
import { AppConstants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent implements OnInit {
  page: number = 0;
  sortBy: string = 'username';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    
  }

  onGetDonorDetails() {
    this.httpClient.get<Donor[]>(
      environment.rooturl + AppConstants.USER_API_URL + `/getUsersByRole/ROLE_DONOR/${this.page}/${this.sortBy}`,
    ).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  

}
