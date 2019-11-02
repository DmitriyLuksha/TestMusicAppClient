import { Component, OnInit } from '@angular/core';
import { RegistrationData } from './models/registration-data.model'

@Component({
  selector: 'sma-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor() {
    this.registrationData = {};
  }

  registrationData: RegistrationData;

  ngOnInit() {
  }
}
