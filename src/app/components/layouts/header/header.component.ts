import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isAuthenticated;
  }
}
