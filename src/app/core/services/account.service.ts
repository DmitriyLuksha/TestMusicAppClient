import { Injectable } from '@angular/core';
import { AccountDetails } from '../models/account-details.model';
import { AccountApiService } from '../api/account-api.service';

@Injectable()
export class AccountService {
    constructor(private accountApiService: AccountApiService) {
    }
    
    private accountDetailsCache: AccountDetails;
    
    async getAccountDetails(): Promise<AccountDetails> {
        if (this.accountDetailsCache == null) {
            this.accountDetailsCache = await this.accountApiService.getAccountDetails().toPromise();
        }

        return Promise.resolve(this.accountDetailsCache);
    }
}