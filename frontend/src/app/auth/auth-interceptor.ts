import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    // inject the auth service on construction
    constructor(private authService: AuthService) {}

    // implement the intercept
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        // get the current token
        const authToken = this.authService.getToken();

        // clone the request
        const authRequest = req.clone({

            // backend api uses the authorization header
            headers: req.headers.set('Authorization', 'Bearer' + authToken)
        })

        // return the handled request
        return next.handle(authRequest);
    }
}