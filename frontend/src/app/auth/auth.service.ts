import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// declare a constant for the backend url specified in the environments
const BACKEND_URL = environment.apiUrl + '/user/';


// use providedIn vs providers array in module
@Injectable({providedIn: 'root'})
export class AuthService {
    
    // value for if the user is authenticated, default false
    private isAuthenticated = false;

    // token for the authroization
    private token: string | null = null;

    // listener for authorization status, authorization is a boolean value
    private authStatusListener = new Subject<boolean>();

    // remaining time on the token response
    private tokenTimer: any;

    // id for the user
    private userId: string | null = null;

    // adds the HttpClient for requests and router for navigation
    constructor(private http: HttpClient, private router: Router) {}

    /**
     * Section for getters
     * contains way so accessing private values within
     * the service
     */

    // return the token to the user
    getToken(): string | null{
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

    // return the user id
    getUserId(): string | null{
        return this.userId;
    }

    // create a user from an email password combination
    createUser(email: string, password: string): void {

        // create an AuthData object for the provided information
        const authData: AuthData = { email: email, password: password}

        // post the auth data via http client
        this.http.post(BACKEND_URL + 'signup', authData)
            .subscribe(() => {

                // this occurs after non-error response
                this.router.navigate(['/']);
            
                // handle errors
            }, err => {

                // something went wrong, so send out a not authorized
                this.authStatusListener.next(false);
            })
    }

    /**
     *  Method ot log out the user, clear all values
     */

    logout(): void {

        // every value needs to be cleared out on login
        this.token = null;
        this.userId = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['/']);
        this.clearAuthData();

        // clear the timer
        clearTimeout(this.tokenTimer);

    }

    /**
     * Method to log in the user
     * @param email 
     * @param password 
     */
    loginUser(email: string, password: string): void {

        // create auth data instance
        const authData: AuthData = {email: email, password: password};

        this.http
            // specify the expected items in the post response and call backend url with auth data
            .post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + 'login', authData)
                .subscribe(response => {
                    
                    // pull the token from the response
                    const token = response.token;
                    
                    // assign to the local store
                    this.token = token;

                    // assign teh userId
                    this.userId = response.userId

                    // ensures that there is a non-null token
                    if (token) {

                        //get the expiration information
                        const expiresInDuration = response.expiresIn;

                        // set the tiemr
                        this.setAuthTimer(expiresInDuration);

                        // set the authentication
                        this.isAuthenticated = true;

                        // broadcast the auth change
                        this.authStatusListener.next(true);

                        // determine expriation date
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                        this.saveAuthData(token, expirationDate, this.userId);
                    }
                    // for an error, there should be no auth
                }, err => {
                    this.authStatusListener.next(false);
                })
    }
    /**
     *  automatically logs in user with locally stored info
     * @returns 
     */
    autoAuthUser(): void{
        // get the locally stored authorization info
        const authInformation = this.getAuthData();

        // if it is not there, end the method
        if(!authInformation){
            return;
        }

        // date for new expires in calc
        const now = new Date();

        // expiration calculation
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

        // checks if the time is still valid
        if(expiresIn > 0) {

            // pull the token from authInformation
            this.token = authInformation.token;

            // set authentication to true
            this.isAuthenticated = true;

            // push out the value on the listener
            this.authStatusListener.next(true);

            // update expires In
            this.setAuthTimer(expiresIn / 1000);
        }
    }

    /**
     * Method to locally store the token, expiration, and user.
     * @param token 
     * @param expirationDate 
     * @param userId 
     */
    private saveAuthData(token: string, expirationDate: Date, userId: string): void{
        // store the token locally
        localStorage.setItem('token', token);

        // store the expiration locally
        localStorage.setItem('expiration', expirationDate.toISOString());

        // store the userId
        localStorage.setItem('userId', userId);
    }

    /**
     * remove all auth data from the local store
     */
    private clearAuthData(): void{

        // remove the three items from saveAuthData
        localStorage.remove('token');
        localStorage.remove('expiration');
        localStorage.remove('userId');
    }

    /**
     * taking in a duration and setting a timeout for it
     * @param duration 
     */
    private setAuthTimer(duration: number): void{

        // assign local value
        this.tokenTimer = setTimeout(() => {

            // trigger logout on expiration
            this.logout();

            // set the duration
        }, duration * 1000)
    }

    private getAuthData(): {token: string | null, expirationDate: Date, userId: string | null} {
        
        // pull the values from the localStorage
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');

        return {
            token : token,
            expirationDate: new Date(String(expirationDate)), // needed for Date Constructor not supporting | null
            userId: userId
        }
    }

}