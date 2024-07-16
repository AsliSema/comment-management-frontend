import { Component } from '@angular/core';
import { AddCommentFormComponent } from '../../../../features/comments/components/add-comment-form/add-comment-form.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-add-comment-page',
  standalone: true,
  imports: [AddCommentFormComponent, NavbarComponent],
  templateUrl: './add-comment-page.component.html',
  styleUrl: './add-comment-page.component.css'
})
export class AddCommentPageComponent {

}
