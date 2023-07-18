import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { JwtTokenService } from './components/jwt/jwt-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private jwtTokenService: JwtTokenService) {}

  title = 'blood-bank-frontend';
  isLoggedIn$ = this.authService.isLoggedIn();
  role$ = this.authService.getRole();
}
