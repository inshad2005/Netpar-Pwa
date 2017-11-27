import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
// import { CeiboShare } from 'ng2-social-share';
import { FacebookService,InitParams,UIParams,UIResponse} from 'ngx-facebook';
import { AppProvider } from '../../providers/app';
import { DomSanitizer } from '@angular/platform-browser';




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
  shareUrl;

  constructor(private domSanitizer:DomSanitizer,private appProvider:AppProvider,private router:Router,private fb: FacebookService) {
    let initParams: InitParams = {
      appId      : '223293578209386',
      xfbml      : true,
      version    : 'v2.10'
    };
    fb.init(initParams);
  }

  ngOnInit() {
    this.shareUrl="http://europa.promaticstechnologies.com/netpar-pwa-dev/#/shareArticle/"+this.appProvider.current.article_id
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
 
 onwhatsapp(){
   window.open("http://localhost:4200/#/shareArticle/"+this.appProvider.current.article_id)
 }

 safeUrl(){
  return  this.domSanitizer.bypassSecurityTrustResourceUrl(this.shareUrl);
 }

 getUrl(){
    let url="whatsapp://send?text=http://europa.promaticstechnologies.com/netpar-pwa-dev/#/shareArticle/"+this.appProvider.current.article_id;
    // alert(url);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
 }

 safeUrlForSms(){
   let url="sms:+919999999999?body=http://europa.promaticstechnologies.com/netpar-pwa-dev/#/shareArticle/"+this.appProvider.current.article_id;
   return this.domSanitizer.bypassSecurityTrustResourceUrl(url)
 }


 articleId(){
   return this.appProvider.current.article_id
 }


}

