import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationApiService {
    constructor(private http: HttpClient) {
    }

    signIn(username: string, password: string): Observable<void> {
        const params = {
            username: username,
            password: password
        }

        return <Observable<void>>(<unknown>this.http.post('api/authentication/signin', params));
    }

    signOut(): Observable<void> {
        return <Observable<void>>(<unknown>this.http.post('api/authentication/signout', {}));
    }
}