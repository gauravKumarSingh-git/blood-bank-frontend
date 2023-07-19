import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenService } from './components/jwt/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private jwtTokenService: JwtTokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwtTokenService.getToken();
    if(token){
      const modifiedRequest = req.clone({headers: req.headers.append('Authorization', `Bearer ${token}`)});
      return next.handle(modifiedRequest);
    }else{
      return next.handle(req);
    }
  }
}
