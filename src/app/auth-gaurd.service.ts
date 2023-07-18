import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { JwtTokenService } from "./components/jwt/jwt-token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService, 
        private router: Router,
        private jwtTokenService: JwtTokenService) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isLoggedIn()){
            if(route.data["role"] === this.jwtTokenService.getRole()){
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }

}