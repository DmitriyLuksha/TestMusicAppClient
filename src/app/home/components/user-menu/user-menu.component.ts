import { Component, OnInit } from '@angular/core';

import { AuthenticationApiService } from 'src/app/core/api/authentication-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sma-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(private authenticationApiService: AuthenticationApiService,
    private router: Router) {

  }

  ngOnInit() {
  }

  signOut() {
    this.authenticationApiService
      .signOut()
      .subscribe(() => this.router.navigate(['/authentication/signin']));
  }

}
