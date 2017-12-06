import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { StateDialogComponent } from './state-dialog/state-dialog.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';
import { StateService } from '../providers/state.service';
import { LanguageService } from '../providers/language.service';
import { AppProvider } from '../providers/app'

@Component({
  selector: 'app-welcome-screen2',
  templateUrl: './welcome-screen2.component.html',
  styleUrls: ['./welcome-screen2.component.css'],
  providers:[StateService,LanguageService]
})
export class WelcomeScreen2Component implements OnInit {
  states;
  languages;
  selectedState;
  selectedLanguage;
  refrralId
  constructor(private appProvider:AppProvider,private route:ActivatedRoute,private dialog: MatDialog, private router:Router, private stateService:StateService,private languageService:LanguageService) { 
    this.routeConfig()
  }

  	ngOnInit(){
      this.getStates();
      this.getLanguages();
    	localStorage['currentpath']=this.router.url;
  	}

    getStates(): void {
      this.stateService.getStates().then(data =>{
        this.states = data
        // alert(JSON.stringify(data))
      } );
    }

    getLanguages(): void {
      this.languageService.getLanguages().then(data =>{
        this.languages = data
         // alert(JSON.stringify(data))
      } );
    }

    onSelected(){
      if (this.selectedLanguage) {
       localStorage['selectedLanguage']=this.selectedLanguage;
       this.router.navigate(['/welcome-screen'],{skipLocationChange:false})
      }
    }

    routeConfig(){
      this.refrralId = this.route.snapshot.paramMap.get('referralId');
      if (this.refrralId) {
        this.appProvider.current.refferalId=this.refrralId;
      }
    }

}
