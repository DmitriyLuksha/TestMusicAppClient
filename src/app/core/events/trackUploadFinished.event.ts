import BaseEvent from './base.event';

export default class TrackUploadFinishedEvent extends BaseEvent {
    isSuccess: boolean;
    playlistId: string;
    trackName: string;
}