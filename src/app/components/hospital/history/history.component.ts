import { Component } from '@angular/core';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { DonorService } from '../../donor/donor.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  constructor(private donorService: DonorService) {}

  requests$ = this.donorService.donorDetails$
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
