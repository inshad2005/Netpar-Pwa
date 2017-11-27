import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';
import {FirstComponent} from './first/first.component'
import {SecondComponent} from './second/second.component'
import {NotfoundComponent} from './notfound/notfound.component'
import {ThirdComponent} from './third/third.component'
import {AuthGuard} from './guard/auth.guard'


const routes: Routes = [
{path:'',redirectTo:'first',pathMatch:'full'},
{path:'first',component:FirstComponent},
{path:'second/:id',component:SecondComponent},
{path:'third',component:ThirdComponent,canActivate:[AuthGuard]},
{path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 
	constructor(private router:Router){

	}
   canActivate() {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/first']);
        return false;
    }
}
