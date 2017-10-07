import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppProvider } from '../providers/app'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appProvider:AppProvider,private router: Router,private location: Location) { }

  ngOnInit() {
  }

  onBack(){
  	this.location.back();
  }

  onSignIn(){
   	this.router.navigate(['/login'],{skipLocationChange:true});
  }

  onSignUp(){
    this.appProvider.current.fromPageFlag="signup";
  	this.router.navigate(['/login'],{skipLocationChange:true})
  }

}
