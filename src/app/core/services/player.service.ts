import { Howl } from 'howler';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlayerService {
    private currentSound: Howl;

    playTrack(trackId: string) {
        this.unload();

        // TODO This logic belongs to API services, but we need direct url. Think where we could move it
        const url = `${environment.baseApiUrl}/tracks/${trackId}`;

        this.currentSound = new Howl({
            src: url,
            format: 'mp3',
            xhrWithCredentials: true
        });

        this.currentSound.play();

        // Volume control isn't implemented yet
        this.setVolume(0.5);
    }

    unload() {
        if (this.currentSound) {
            this.currentSound.unload();
            this.currentSound = null;
        }
    }

    start() {
        if (!this.currentSound) {
            return;
        }

        this.currentSound.play();
    }

    pause() {
        if (!this.currentSound) {
            return;
        }

        this.currentSound.pause();
    }

    toggle() {
        if (!this.currentSound) {
            return;
        }

        if (this.isPlaying()) {
            this.pause();
        }
        else {
            this.start();
        }
    }

    setVolume(volume: number) {
        if (!this.currentSound) {
            return;
        }

        this.currentSound.volume(volume);
    }

    isPlaying() {
        if (!this.currentSound) {
            return false;
        }

        return this.currentSound.playing();
    }
}