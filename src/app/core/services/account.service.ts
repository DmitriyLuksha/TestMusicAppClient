import { AccountApiService } from '../api/account-api.service';
import { AccountDetails } from '../models/account-details.model';
import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import UserDetailsChanged from '../events/userDetailsChanged.event';

@Injectable()
export class AccountService {
    constructor(
        private accountApiService: AccountApiService,
        private eventsService: EventsService
    ) {
        // We don't have to unsubscribe because AccountService singleton
        eventsService.on(UserDetailsChanged, this.removeCachedAccountDetails, this);
    }
    
    // TODO Move this caching logic into cache service
    private accountDetailsCache: AccountDetails;
    private accountDetailsPromise: Promise<AccountDetails>;
    
    async getAccountDetailsAsync(): Promise<AccountDetails> {
        if (this.accountDetailsPromise) {
            return this.accountDetailsPromise;
        }

        if (this.accountDetailsCache == null) {
            this.accountDetailsPromise = this.accountApiService.getAccountDetails().toPromise();

            this.accountDetailsPromise = this.accountDetailsPromise
                .then((details) => {
                    this.onAccountDetailsLoaded(details);
                    return details;
                })
                .catch(() => this.accountDetailsPromise = null);

            return this.accountDetailsPromise;
        }

        return Promise.resolve(this.accountDetailsCache);
    }

    private onAccountDetailsLoaded(details: AccountDetails) {
        this.accountDetailsPromise = null;
        this.accountDetailsCache = details;
    }

    private removeCachedAccountDetails() {
        this.accountDetailsPromise = null;
        this.accountDetailsCache = null;
    }
}