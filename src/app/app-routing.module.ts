import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';


const routes: Routes = [// { path: 'home',      component: HomeComponent },
    // { path: 'admin',      component: AdminComponent },
    { path: '',  redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'homepage2', component: Homepage2Component },
    { path: 'article-details', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
