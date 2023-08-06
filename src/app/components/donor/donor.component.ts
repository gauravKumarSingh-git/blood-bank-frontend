import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Request } from '../shared/request.model';
import { DonorService } from './donor.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  acceptedRequests: number;
  pendingRequests: number;
  rejectedRequests: number;
  requests: Request[];

  constructor(private donorService: DonorService){}



  ngOnInit(): void {

    this.donorService.donorDetails$
    .pipe(
      map((data) => data.requests),
    ).subscribe(
      (data) =>{
         this.requests = data
         this.acceptedRequests = this.requests.filter((request) => request.status === 'accepted').length;
         this.pendingRequests = this.requests.filter((request) => request.status === 'pending').length;
         this.rejectedRequests = this.requests.filter((request) => request.status === 'rejected').length;
      }
    )

    

  }

  

}
