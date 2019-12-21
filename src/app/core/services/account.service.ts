import { AccountApiService } from '../api/account-api.service';
import { AccountDetails } from '../models/account-details.model';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {
    constructor(private accountApiService: AccountApiService) {
    }
    
    // TODO Move this caching logic into cache service
    private accountDetailsCache: AccountDetails;
    private accountDetailsPromise: Promise<AccountDetails>;
    
    async getAccountDetails(): Promise<AccountDetails> {
        if (this.accountDetailsPromise) {
            return this.accountDetailsPromise;
        }

        if (this.accountDetailsCache == null) {
            this.accountDetailsPromise = this.accountApiService.getAccountDetails().toPromise();

            this.accountDetailsPromise
                .then(() => this.accountDetailsPromise = null)
                .catch(() => this.accountDetailsPromise = null);

            return this.accountDetailsPromise;
        }

        return Promise.resolve(this.accountDetailsCache);
    }
}