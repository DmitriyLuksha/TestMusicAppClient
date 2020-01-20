import * as HttpStatus from 'http-status-codes'

import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    apiPrefix = 'api/';

    // Since we can't pass data to interceptors we have to hardcode route
    // TODO Think about bypassing this restriction
    ignoreUnauthorized = [
        'api/accounts/details'
    ]

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Ignore non-api calls
        if (!req.url.startsWith(this.apiPrefix)) {
            return next.handle(req);
        }

        let url = req.url;
    
        // Remove api prefix
        url = url.substr(this.apiPrefix.length)
        url = `${environment.baseApiUrl}/${url}`;
        
        const apiReq = req.clone({
            url: url,
            withCredentials: true
        });
        
        return next.handle(apiReq).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    event = event.clone({ body: event.body.data });
                }

                return event;
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === HttpStatus.UNAUTHORIZED
                        && !this.ignoreUnauthorized.includes(req.url)) {
                    this.authenticationService.redirectToAuthenticationPage();
                }
                
                return throwError(err);
            })
        );
    }
}