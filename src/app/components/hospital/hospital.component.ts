import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DonorService } from '../donor/donor.service';
import { Request } from '../shared/request.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent {
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
