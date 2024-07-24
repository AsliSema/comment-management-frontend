import { ChangeDetectorRef, Component } from '@angular/core';
import { GetAllTasksDto } from '../../models/get-all-tasks.dto';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { CommentService } from '../../../comments/services/comment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { FormMessage } from '../../../comments/components/add-comment-form/add-comment-form.component';
import { GetUserByEmailResponse } from '../../../comments/models/get-user-by-email-dto';
import { CreateCommentDto } from '../../../comments/models/create-comment-dto';


@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {
  tasks !: GetAllTasksDto[];

  form !: FormGroup;

  formMessage: FormMessage = { success: null, error: null };

  user !: GetUserByEmailResponse | null;
  
  constructor(private taskService: TaskService, private change: ChangeDetectorRef, private formBuilder: FormBuilder, private commentService: CommentService, private router: Router, private authService: AuthService){}

  ngOnInit(){
    this.getTaskList();
    this.createForm();
    this.setUser();
    this.change.markForCheck(); 
  }

  getTaskList(){
    this.taskService.getAllTasks().subscribe((response)=>{
      this.tasks = response;
      
      this.tasks.forEach(task => {
        task.comments = task.comments.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      });


      this.tasks = response;
      this.change.markForCheck()
    })
  }


  //Deneme
  setTaskId(taskId: number): void {
    this.form.controls['taskId'].setValue(taskId);
  }

  createForm(){
    this.form = this.formBuilder.group({
      content: [null, [Validators.required, Validators.minLength(5)]],
      taskId: [null, [Validators.required]],
      userId: [null, [Validators.required]]
    })
  }

  setUser(){
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (user && user.id) {
        this.form.controls['userId'].setValue(user.id);
      } 
      this.change.markForCheck();
    });
  }


  add(){
    const request: CreateCommentDto = {
      content: this.form.value.content,
      taskId: this.form.value.taskId,
      userId: this.form.value.userId
    }

    this.commentService.createComment(request).subscribe({
      next: (response) => {
        console.log(request.userId)
        console.log(response)
      },
      error: (error) => {
        this.formMessage = error.error;
        this.change.markForCheck();
      },
      complete: () => {
        this.formMessage.success = 'Comment add successfully!';
        setTimeout(() => {
          this.formMessage.success = null; 
          this.change.markForCheck();
        }, 1000);
        this.form.reset();
        this.change.markForCheck();

        setTimeout(()=>{
          this.router.navigate(['/']);
          this.getTaskList();
          this.setUser()
        }, 2000)  
      }  
    })
  }


  onFormSubmit() {
    console.log(this.form.value)
    if (this.form.invalid) {
      this.formMessage.error = this.getErrorMessage();
      return;
    }
    this.add();
  }

  private getErrorMessage(): string | null {
    const controls = this.form.controls;
  
    for (const controlName in controls) {
      const control = controls[controlName];
      if (control.invalid) {
        if (control.errors?.['required']) {
          return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
        }
        if (control.errors?.['minlength']) {
          return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters.`;
        }
        if (control.errors?.['maxlength']) {
          return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at most ${control.errors['maxlength'].requiredLength} characters.`;
        }
        if (control.errors?.['min']) {
          return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be the minimum ${control.errors['min'].min}.`;
        }
      }
    }
  
    return null;
  }

}
