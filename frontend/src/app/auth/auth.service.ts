import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// use providedIn vs providers array in module
@Injectable({providedIn: 'root'})
export class AuthService {
    
    // value for if the user is authenticated, default false
    private isAuthenticated = false;

    // token for hte authroization
    private token: string;

    // listener for authorization status, authorization is a boolean value
    private authStatusListener = new Subject<boolean>();

    // remaining time on the token
    private tokenTimer: any;

    // id for the user
    private userId: string;

    // adds the HttpClient for requests and router for navigation
    constructor(private http: HttpClient, private router: Router) {}

    /**
     * Section for getters
     * contains way so accessing private values within
     * the service
     */

    // return the token to the user
    getToken(): string {
        return this.token;
    }

    // return the auth listener
    getAuthStatusListener(): Observable<boolean> {
        return this.authStatusListener.asObservable();
    }

    // return the authorization status
    getIsAuth(): boolean {
        return this.isAuthenticated;
    }

    getUserId(): string {
        return this.userId;
    }
}