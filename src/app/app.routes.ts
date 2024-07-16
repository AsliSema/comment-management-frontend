import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './shared/layout/home-layout/home-layout.component';
import { LoginPageComponent } from './routes/login-page/login-page/login-page.component';
import { AddCommentPageComponent } from './routes/comment-page/add-comment-page/add-comment-page/add-comment-page.component';
import { MyCommentsPageComponent } from './routes/comment-page/my-comments-page/my-comments-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeLayoutComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "add-comment",
        component: AddCommentPageComponent
    },
    {
        path: "my-comments",
        component: MyCommentsPageComponent
    }
];
