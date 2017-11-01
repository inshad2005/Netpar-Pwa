import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  test2:any;
  showShareButton=false;

  constructor(private router:Router) {
  }

  ngOnInit() {
  	this.test2=this.test.toISOString()
  	if(this.router.url=='/article-details'){
  		this.showShareButton=true;
  	}
  }


}
