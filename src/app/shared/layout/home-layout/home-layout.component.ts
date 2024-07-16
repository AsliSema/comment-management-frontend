import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TasksListComponent } from '../../../features/tasks/components/tasks-list/tasks-list.component';
import { AddCommentFormComponent } from '../../../features/comments/components/add-comment-form/add-comment-form.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [NavbarComponent, TasksListComponent, AddCommentFormComponent, RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
