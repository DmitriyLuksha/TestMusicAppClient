import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track.model';

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

    uploadYoutube(playlistId: string, name: string, videoId: string): Observable<void> {
        const params = {
            playlistId,
            name,
            videoId
        };

        return <Observable<void>>(<unknown>this.http.post(`api/tracks/uploadYoutube`, params));
    }

    getTracksForPlaylist(playlistId: string): Observable<Track[]> {
        const params = {
            playlistId: playlistId
        }

        return <Observable<Track[]>>this.http.get('api/tracks/getForPlaylist', { params: params });
    }
}