import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css'],
  providers:[AppProvider]
})
export class WelcomeScreenComponent implements OnInit {

  constructor(private router:Router,private appProvider:AppProvider) { 
  	// if(this.appProvider.current.currentLanguage){
  		
  	// }
  }

  ngOnInit() {
  }

}
