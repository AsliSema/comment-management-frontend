import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './shared/layout/home-layout/home-layout.component';
import { LoginPageComponent } from './routes/login-page/login-page/login-page.component';
import { AddCommentPageComponent } from './routes/comment-page/add-comment-page/add-comment-page/add-comment-page.component';
import { MyCommentsPageComponent } from './routes/comment-page/my-comments-page/my-comments-page.component';
import { tokenGuard } from './shared/guards/token.guard';
import { NotFoundPageComponent } from './routes/not-found-page/not-found-page.component';

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
        canActivate: [tokenGuard],
        component: AddCommentPageComponent
    },
    {
        path: "my-comments",
        canActivate: [tokenGuard],
        component: MyCommentsPageComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
