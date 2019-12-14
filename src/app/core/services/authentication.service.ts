import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '../api/authentication-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor(
        private router: Router,
        private authenticationApiService: AuthenticationApiService
    ) { }

    signIn(username: string, password: string): Observable<any> {
        return this.authenticationApiService.signIn(username, password);
    }

    signOut(): Observable<any> {
        return this.authenticationApiService.signOut();
    }
      
    redirectToAuthenticationPage(): void {
        this.router.navigate(['/authentication/signin']);
    }
}