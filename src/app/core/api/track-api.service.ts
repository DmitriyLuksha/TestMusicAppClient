import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TrackApiService {
    constructor(private http: HttpClient) {
    }
    
    uploadFile(playlistId: string, name: string, file: File): Observable<void> {
        let formData = new FormData();

        formData.append('name', name);
        formData.append('playlistId', playlistId);
        formData.append('file', file, file.name);

        return <Observable<void>>(<unknown>this.http.post(`api/tracks/uploadFile`, formData));
    }
}