import { Component, OnInit } from '@angular/core';

import { AccountDetails } from 'src/app/core/models/account-details.model';
import { AccountService } from 'src/app/core/services/account.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
    selector: 'sma-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService,
        private accountService: AccountService,
    ) { }

    accountDetails: AccountDetails;

    async ngOnInit() {
        try {
            this.accountDetails = await this.accountService.getAccountDetailsAsync();
        }
        catch(error) {
            this.authenticationService.redirectToAuthenticationPage();
        }
    }
}
