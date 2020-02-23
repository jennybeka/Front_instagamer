import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { PostsComponent } from './components/posts/posts.component'
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
  { path: 'instagamer/home', component: HomeComponent,  canActivate: [AuthGuard] },
  { path: '', redirectTo: '/instagamer/login', pathMatch: 'full' },
  { path: 'instagamer/register', component: RegisterComponent },
  { path: 'instagamer/login', component: LoginComponent },
  { path: 'instagamer/posts/:page', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'instagamer/profile/:page', component: ProfileComponent,  canActivate: [AuthGuard] },
  { path: 'instagamer/posts/create', component: ProfileComponent,  canActivate: [AuthGuard]},
  { path: 'instagamer/posts/photo/:id', component: PostsComponent,  canActivate: [AuthGuard]},
  { path: 'instagamer/posts/:idPhoto', component: PostsComponent },
  { path: 'instagamer/posts/comment/:idphoto', component: PostsComponent },
  { path: 'instagamer/posts/comment/:idcomment', component: PostsComponent },
  { path: 'instagamer/posts/like/:idphoto', component: PostsComponent },
  { path: 'instagamer/posts/dislike/:idLike', component: PostsComponent },
 
  { path: 'instagamer/logout', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
