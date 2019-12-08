import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    constructor(private router: Router) {
    }
      
    redirectToAuthenticationPage() {
        this.router.navigate(['/authentication/signin']);
    }
}