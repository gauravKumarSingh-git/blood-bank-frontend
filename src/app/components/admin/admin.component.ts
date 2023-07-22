import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/app/environments/environment';
import { BloodGroup } from './shared/blood-group.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {

  getBloodGroups =
    environment.rooturl +
    AppConstants.BLOOD_BANK_API_URL +
    `/getBloodGroups/1`;

  constructor(private httpClient: HttpClient) {}

  bloodGroups$ = this.httpClient.get<BloodGroup[]>(this.getBloodGroups)
  .pipe(
    tap((data) => console.log(data)),
    map((data) => 
      data.sort((a, b) => {
        return a.bloodGroupName.localeCompare(b.bloodGroupName);
      })
    ),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  )

}
