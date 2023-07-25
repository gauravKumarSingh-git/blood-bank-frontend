import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { DonorService } from '../../donor/donor.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  errorMessage = '';
  successMessage = '';
  userId = '';
  requestBloodForm: FormGroup;
  addRequestAPI =
    environment.rooturl + AppConstants.USER_API_URL + '/addRequest';

  constructor(private http: HttpClient, private donorService: DonorService) {}

  ngOnInit(): void {
    this.requestBloodForm = new FormGroup({
      bloodGroup: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [
        Validators.required,
        Validators.max(1000),
        Validators.min(1),
      ]),
    });
  }

  onSubmit() {
    // console.log(this.donateBloodForm);
    this.donorService.donorDetails$.pipe(map((data) => data.userId)).subscribe(
      (data) => {
        this.userId = data;
        this.http
          .patch(
            `${this.addRequestAPI}/${this.userId}`,
            this.requestBloodForm.value,
            { responseType: 'text' }
          )
          .subscribe(
            (data) => {
              this.successMessage = 'Request successfully submitted';
              // console.log(data);
            },
            (error) => {
              this.errorMessage = error;
              console.log(error.message);
            }
          );
      },
      (error) => console.log(error)
    );
  }
}
