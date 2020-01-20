import BaseEvent from '../../../core/events/base.event';

export default class TrackPlayRequestedEvent extends BaseEvent {
    trackId: string;
}