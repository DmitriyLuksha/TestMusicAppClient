import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigApiService {
    constructor(private http: HttpClient) {
    }
    
    getApplicationInsightInstrumentationKey(): Observable<string> {
        return <Observable<string>>this.http.get('api/config/applicationInsightInstrumentationKey');
    }
}