import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationApiService {
    constructor(private http: HttpClient) {
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