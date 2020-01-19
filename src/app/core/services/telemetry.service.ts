import { NavigationEnd, ResolveEnd, Router } from '@angular/router';

import { AccountService } from './account.service';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ConfigApiService } from '../api/config-api.service';
import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import UserDetailsChanged from '../events/userDetailsChanged.event';

@Injectable()
export class TelemetryService {
    private applicationInsights: ApplicationInsights

    constructor(
        private router: Router,
        private configApiService: ConfigApiService,
        private accountService: AccountService,
        private eventsService: EventsService
    ) {
        configApiService.getApplicationInsightInstrumentationKey()
            .subscribe((instrumentationKey) => {
                this.setUpApplicationInsights(instrumentationKey);
            });

        // TelemetryService is a singleton, we don't need to unsubscribe
        this.eventsService.on(UserDetailsChanged, this.updateUserId, this);
    }
    
    private setUpApplicationInsights(instrumentationKey: string) {
        // Telemetry disabled
        if (!instrumentationKey) {
            return;
        }

        this.applicationInsights = new ApplicationInsights({
            config: {
                instrumentationKey
            }
        });

        this.applicationInsights.loadAppInsights();
        this.trackPageView();

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && this.applicationInsights) {
                this.trackPageView();
            }
        });

        this.updateUserId();
    }

    private trackPageView() {
        this.applicationInsights.trackPageView({
            uri: this.router.url
        });
    }

    private updateUserId() {
        this.accountService.getAccountDetailsAsync()
            .then((details) => this.setUserId(details.id))
            .catch(() => {
                // Just ignore it, probably user not logged in
            });
    }    

    private setUserId(userId: string) {
        if (this.applicationInsights && userId) {
            this.applicationInsights.setAuthenticatedUserContext(userId);
        }
    }
}