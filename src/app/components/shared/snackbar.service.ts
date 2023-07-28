import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbarSubject: Subject<string> = new Subject<string>();

  constructor(private snackBar: MatSnackBar) {
    this.snackbarSubject.subscribe((message) => {
      this.showSnackbar(message);
    });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }

  showSnackbarMessage(message: string) {
    this.snackbarSubject.next(message);
  }
}
