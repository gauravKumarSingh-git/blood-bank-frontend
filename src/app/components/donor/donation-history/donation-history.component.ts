import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonationHistoryComponent {
  
  constructor(private donorService: DonorService) {}

  donations$ = this.donorService.donorDetails$
    .pipe(
      tap(data => console.log(data)),
      map(data => data.requests),
      map(data => data.sort((a, b) => { return b.date.localeCompare(a.date)})),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    )
}
