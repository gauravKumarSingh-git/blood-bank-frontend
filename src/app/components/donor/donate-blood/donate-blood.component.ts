import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { ToastService } from '../../shared/toast/toast.service';
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

  constructor(private http: HttpClient, private donorService: DonorService, private toastService: ToastService) {}

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
              // this.successMessage = data;
              this.toastService.show('Donation Request Successfully Submitted', { classname: 'bg-success text-light', delay: 3000 });
              this.donateBloodForm.reset();
            },
            (error) => {
              // this.errorMessage = error;
              this.toastService.show(error, { classname: 'bg-danger text-light', delay: 3000 });
            }
          );
      },
      (error) => console.log(error)
    );
  }
}
