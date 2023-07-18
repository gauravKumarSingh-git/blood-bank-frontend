import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
    selector: 'app-login-header',
    templateUrl: './login-header.component.html',
    styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent {

    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}