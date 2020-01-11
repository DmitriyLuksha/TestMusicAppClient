import BaseEvent from './base.event';

export default class TrackUploadFinished extends BaseEvent {
    isSuccess: boolean;
    playlistId: string;
    trackName: string;
}