import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationApiService {
    constructor(private http: HttpClient) {
    }
      
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

    signIn(username: string, password: string): Observable<any> {
        const params = {
            username: username,
            password: password
        }

        return this.http.post('api/account/signin', params);
    }

    signOut(): Observable<any> {
        return this.http.post('api/account/signout', {});
    }
}