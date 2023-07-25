import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donate-blood',
  templateUrl: './donate-blood.component.html',
  styleUrls: ['./donate-blood.component.css'],
})
export class DonateBloodComponent {
  errorMessage = '';
  successMessage = '';
  userId = '';
  donateBloodForm: FormGroup;
  addRequestAPI =
    environment.rooturl + AppConstants.USER_API_URL + '/addRequest';

  constructor(private http: HttpClient, private donorService: DonorService) {}

  ngOnInit(): void {
    this.donateBloodForm = new FormGroup({
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
            this.donateBloodForm.value,
            { responseType: 'text' }
          )
          .subscribe(
            (data) => {
              this.successMessage = data;
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
