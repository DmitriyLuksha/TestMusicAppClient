import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  apiPrefix = 'api/';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Ignore non-api calls
    if (!req.url.startsWith(this.apiPrefix)) {
      return next.handle(req);
    }

    let url = req.url;
  
    // Remove api prefix
    url = url.substr(this.apiPrefix.length)
    url = `${environment.baseApiUrl}/${url}`;
    
    const apiReq = req.clone({ url: url });
    
    return next.handle(apiReq).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: event.body.data });
        }

        return event;
      })
    );
  }
}