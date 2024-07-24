import { ChangeDetectorRef, Component } from '@angular/core';
import { GetCommentsByUserId } from '../../models/get-comments-by-userId.dto';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FormMessage } from '../add-comment-form/add-comment-form.component';

@Component({
  selector: 'app-get-comments-belong-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './get-comments-belong-user.component.html',
  styleUrl: './get-comments-belong-user.component.css'
})
export class GetCommentsBelongUserComponent {

  comments !: GetCommentsByUserId[];
  userId !: number |  undefined;

  formMessage: FormMessage = { success: null, error: null };

  constructor(private commentService: CommentService, private change: ChangeDetectorRef, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.getUser();
    this.getCommentList();
    this.change.markForCheck(); 
  }

  getUser(){
    this.authService.getUser().subscribe(user => {
      this.userId = user?.id; 
      if (this.userId !== undefined) {
        this.getCommentList(); 
      }
      this.change.markForCheck();
    });
  }

  getCommentList(){
    if (this.userId !== undefined) {
      this.commentService.getCommentsBelongUser(this.userId).subscribe((response)=>{
        this.comments = response
        this.change.markForCheck();
      });
    }
  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId , this.userId as number).subscribe({
      error: (error) => {
        this.formMessage = error.error;
        this.change.markForCheck();
      },
      complete: () => {
        this.formMessage.success = 'Comment deleted successfully!';
        setTimeout(() => {
          this.formMessage.success = null; 
          this.change.markForCheck();
        }, 1000);
        this.change.markForCheck();

        setTimeout(()=>{
          this.router.navigate(['/']);
          this.getCommentList();
        }, 2000)  
      }  
    })
  }



}
