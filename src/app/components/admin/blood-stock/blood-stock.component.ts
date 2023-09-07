import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-blood-stock',
  templateUrl: './blood-stock.component.html',
  styleUrls: ['./blood-stock.component.css']
})
export class BloodStockComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  updateBloodGroupAPI = environment.rooturl + AppConstants.BLOOD_GROUP_API_URL + '/updateQuantity';
  bloodStockForm: FormGroup;

  constructor(private http: HttpClient, private toastService: ToastService) {}
  
  ngOnInit(): void {
    this.bloodStockForm = new FormGroup({
      'bloodGroup': new FormControl(null, [Validators.required]),
      'quantity': new FormControl(null, [Validators.required, Validators.max(1000), Validators.min(1)])
    })
  }

  onSubmit() {
    console.log(this.bloodStockForm);
    this.http.patch(
      `${this.updateBloodGroupAPI}/${this.bloodStockForm.value['bloodGroup']}/${this.bloodStockForm.value['quantity']}`,
      null,
      {
        responseType: 'text'
      }
    ).subscribe(
      response => {
        // console.log(response);
        // this.successMessage = response;
        this.toastService.show(response, { classname: 'bg-success text-light', delay: 3000 });
        this.bloodStockForm.reset();
      },
      error => {
        // console.log(error)g
        // this.errorMessage = error;
        this.toastService.show(error, { classname: 'bg-danger text-light', delay: 3000 });
        this.bloodStockForm.reset();
      }
    )
  }


}
