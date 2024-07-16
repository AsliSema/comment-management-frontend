import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CreateCommentDto } from '../../models/create-comment-dto';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';
import { GetUserByEmailResponse } from '../../models/get-user-by-email-dto';
import { AuthService } from '../../../auth/services/auth.service';


export interface FormMessage {
  success: string | null;
  error: string | null;
}


@Component({
  selector: 'app-add-comment-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, ButtonComponent],
  templateUrl: './add-comment-form.component.html',
  styleUrl: './add-comment-form.component.css'
})
export class AddCommentFormComponent implements OnInit{

  form !: FormGroup;

  formMessage: FormMessage = { success: null, error: null };

  user !: GetUserByEmailResponse | null;



  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private change: ChangeDetectorRef, private router: Router, private authService: AuthService
  ){}


  ngOnInit(): void {
    this.createForm();
    this.setUser()
    this.change.markForCheck(); 
    
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
        this.form.reset();
        this.change.markForCheck();

        setTimeout(()=>{
          this.router.navigate(['/']);
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
