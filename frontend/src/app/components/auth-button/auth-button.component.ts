// angular imports
import { Component, OnInit, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

// service imports
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css']
})
export class AuthButtonComponent implements OnInit {

  // declare and initialize a public auth service
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
