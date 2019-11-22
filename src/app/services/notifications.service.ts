import { NotificationsService as AngularNotificationsService } from 'angular2-notifications';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
    constructor(private angularNotificationsService: AngularNotificationsService) {
    }
      
    success(title: string, message?: string) {
        this.angularNotificationsService.success(title, this.replaceNewLines(message));
    }

    error(title: string, message?: string) {
        this.angularNotificationsService.error(title, this.replaceNewLines(message));
    }

    httpError(title: string, error: any) {
        let message: string;

        if (error.error && error.error.errorMessage) {
            message = error.error.errorMessage;
        }
        else {
            message = 'An error has occured';
        }

        this.angularNotificationsService.error(title, this.replaceNewLines(message));
    }

    private replaceNewLines(text?: string): string {
        if (!text) {
            return text;
        }

        return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
    }
}