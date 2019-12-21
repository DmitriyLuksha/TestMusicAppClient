import BaseEvent from '../../core/events/base.event';

export default class PlaylistSelectedEvent extends BaseEvent {
    playlistId: string;
}