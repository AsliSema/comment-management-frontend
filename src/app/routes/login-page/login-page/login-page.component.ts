import { Component } from '@angular/core';
import { HomeLayoutComponent } from '../../../shared/layout/home-layout/home-layout.component';
import { LoginFormComponent } from '../../../features/auth/components/login-form/login-form.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavbarComponent, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
