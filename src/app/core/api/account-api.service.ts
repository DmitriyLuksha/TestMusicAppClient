import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account-details.model';

@Injectable()
export class AccountApiService {
    constructor(private http: HttpClient) {
    }
    
    registerUser(username: string, email: string, password: string): Observable<void> {
        const params = {
            username: username,
            email: email,
            password: password
        };
 
        return <Observable<void>>(<unknown>this.http.post('api/accounts', params));
    }

    isUsernameUnique(username: string): Observable<boolean> {
        const params = {
            username: username
        }

        return <Observable<boolean>>this.http.get('api/accounts/isUsernameUnique', { params: params });
    }

    isEmailUnique(email: string): Observable<boolean> {
        const params = {
            email: email
        }

        return <Observable<boolean>>this.http.get('api/accounts/isEmailUnique', { params: params });
    }

    getAccountDetails(): Observable<AccountDetails> {
        return <Observable<AccountDetails>>this.http.get('api/accounts/details');
    }
}