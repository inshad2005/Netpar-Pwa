import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private router: Router) {}

    canActivate() {
    	console.log('hihihihihihihihihihi')
         if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/welcome-screen2'],{skipLocationChange:true});
        return false;
    }
}
