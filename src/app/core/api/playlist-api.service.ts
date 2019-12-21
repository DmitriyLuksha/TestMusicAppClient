import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';

@Injectable()
export class PlaylistApiService {
    constructor(private http: HttpClient) {
    }
    
    addPlaylist(name: string): Observable<void> {
        const params = {
            name
        };
 
        return <Observable<void>>(<unknown>this.http.post('api/playlists', params));
    }

    getPlaylists(): Observable<Playlist[]> {
        return <Observable<Playlist[]>>this.http.get('api/playlists');
    }

    uploadMusicFile(playlistId: string, name: string, file: File): Observable<void> {
        let formData = new FormData();

        formData.append('name', name);
        formData.append('file', file, file.name);

        return <Observable<void>>(<unknown>this.http.post(`api/playlists/${playlistId}/uploadFile`, formData));
    }
}