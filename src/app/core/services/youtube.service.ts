import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeService {
    constructor(
        private http: HttpClient
    ) { }

    getVideoId(url: string) {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
}