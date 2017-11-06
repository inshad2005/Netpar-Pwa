import { Component,OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { AnalyticsService } from './providers/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TranslateService,AnalyticsService]
})
export class AppComponent implements OnInit {
  title = 'app';
  userid;
  constructor(private router:Router, private translateService: TranslateService,private analyticsService: AnalyticsService){
  	translateService.setDefaultLang(environment.language);
  	translateService.use(environment.language);
  	this.loginGuard();
  }

  ngOnInit(){
  }

  loginGuard(){
  	if(localStorage['userInfo']){
  		this.router.navigate(['/category-view'],{skipLocationChange:true})
  	}else{
  		this.router.navigate(['/welcome-screen2'],{skipLocationChange:true})
  	}
  }


}
