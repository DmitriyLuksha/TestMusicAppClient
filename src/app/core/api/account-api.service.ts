import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AccountApiService {
    constructor(private http: HttpClient) {
    }
    
    // TODO: Rewrite API using async/await

    registerUser(username: string, email: string, password: string): Observable<any> {
        const params = {
            username: username,
            email: email,
            password: password
        };
 
        return this.http.post('api/account', params);
    }

    isUsernameUnique(username: string): Observable<any> {
        const params = {
            username: username
        }

        return this.http.get('api/account/isUsernameUnique', { params: params });
    }

    isEmailUnique(email: string): Observable<any> {
        const params = {
            email: email
        }

        return this.http.get('api/account/isEmailUnique', { params: params });
    }

    getAccountDetails(): Observable<any> {
        return this.http.get('api/account/details');
    }
}