import { Component } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TranslateService]
})
export class AppComponent {
  title = 'app';

  constructor(private router:Router, private translateService: TranslateService,){
  	translateService.setDefaultLang(environment.language);
  	translateService.use(environment.language);
  	this.loginGuard();
  }

  loginGuard(){
  	if(localStorage['userInfo']){
  		this.router.navigate(['/category-view'])
  	}else{
  		this.router.navigate(['/welcome-screen2'])
  	}
  }
}
