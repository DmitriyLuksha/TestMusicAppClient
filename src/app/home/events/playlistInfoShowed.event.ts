import BaseEvent from '../../core/events/base.event';

export default class PlaylistInfoShowedEvent extends BaseEvent {
    playlistId: string;
}