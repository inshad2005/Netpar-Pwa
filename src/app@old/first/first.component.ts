import { Component, OnInit } from '@angular/core';
import {TestService} from '../test.service'
import { Router } from '@angular/router';

import {AppProvider}from '../providers/app.provider'
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  loginModel
  constructor(private testService:TestService,private appProvider:AppProvider,private router:Router) { 
  	this.loginModel={}
  	this.loginModel.role='superAdmin'
  }

  ngOnInit() {
  }
  onclick(){
  	this.testService.onLogin(this.loginModel)
  	.subscribe(data=>{
  		this.appProvider.current.adminData=data.response
  		 if (data.success) {
  		 	localStorage.setItem('isLoggedin', 'true');
  	        this.router.navigate(['/second'],{ skipLocationChange: true });
  		 }
       
     },error=>{

     })
  }
}
