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
 
        return this.http.post('api/users', params);
    }

    isUsernameUnique(username: string): Observable<any> {
        const params = {
            username: username
        }

        return this.http.get('api/users/isUsernameUnique', { params: params });
    }

    isEmailUnique(email: string): Observable<any> {
        const params = {
            email: email
        }

        return this.http.get('api/users/isEmailUnique', { params: params });
    }
}