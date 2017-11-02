import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { CeiboShare } from 'ng2-social-share';
import { FacebookService,InitParams,UIParams,UIResponse} from 'ngx-facebook';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ FacebookService]
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  test2:any;
  showShareButton=false;

  constructor(private router:Router,private fb: FacebookService) {
    let initParams: InitParams = {
      appId      : '223293578209386',
      xfbml      : true,
      version    : 'v2.10'
    };
 
    fb.init(initParams);
  }

  ngOnInit() {
  	this.test2=this.test.toISOString()
  	if(this.router.url=='/article-details'){
  		this.showShareButton=true;
  	}
  }

 share(url: string) {
  let params: UIParams = {
    href: url,
    method: 'share'
  };
  this.fb.ui(params)
    .then((res: UIResponse) => console.log(res))
    .catch((e: any) => console.error(e));
 }
 


}

