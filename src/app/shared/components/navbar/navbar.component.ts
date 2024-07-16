import { ChangeDetectorRef, Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterModule } from '@angular/router';
import { GetUserByEmailResponse } from '../../../features/comments/models/get-user-by-email-dto';
import { AuthService } from '../../../features/auth/services/auth.service';
import { TokenService } from '../../../features/auth/services/token/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  token !: string |  null;


  constructor(private change: ChangeDetectorRef, private tokenService: TokenService ){}


  ngOnInit(){
    this.token = this.tokenService.token;
  }

  logout(){
    this.tokenService.clearToken();
    location.href = "/";
  }

}
