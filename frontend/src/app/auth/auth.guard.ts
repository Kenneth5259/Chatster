import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    
    // inject the authorization service and the router
    constructor(private authService: AuthService, private router: Router) {}

    // implement CanActivate
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        
        // get auth status
        const isAuth = this.authService.getIsAuth();
        
        // redirect to login if not authorized
        if(!isAuth) {
            this.router.navigate(['/auth/login']);
        }

        // return authorization status
        return isAuth;
    }

}