import BaseEvent from '../../core/events/base.event';

export default class PlaylistInfoHiddenEvent extends BaseEvent {
    playlistId: string;
}