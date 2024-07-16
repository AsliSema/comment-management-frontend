import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { GetCommentsBelongUserComponent } from '../../../features/comments/components/get-comments-belong-user/get-comments-belong-user.component';

@Component({
  selector: 'app-my-comments-page',
  standalone: true,
  imports: [NavbarComponent, GetCommentsBelongUserComponent],
  templateUrl: './my-comments-page.component.html',
  styleUrl: './my-comments-page.component.css'
})
export class MyCommentsPageComponent {

}
