import { Component,OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { AnalyticsService } from './providers/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TranslateService,AnalyticsService]
})
export class AppComponent implements OnInit {
  title = 'app';
  userid;
  constructor(private route: ActivatedRoute,private location: Location,private router:Router, private translateService: TranslateService,private analyticsService: AnalyticsService){
  	translateService.setDefaultLang(environment.language);
  	translateService.use(environment.language);
  	this.loginGuard();
  }

  ngOnInit(){
  }

  loginGuard(){
      const id = +this.route.snapshot.paramMap.get('id');
      console.log(id)
    
  	// if(localStorage['userInfo']){
  	// 	this.router.navigate(['/category-view'],{skipLocationChange:true})
  	// }else{
  	// 	this.router.navigate(['/welcome-screen2'],{skipLocationChange:true})
  	// }
  }


}
