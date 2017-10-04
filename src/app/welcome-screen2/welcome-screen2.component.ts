import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material'; 
import { StateDialogComponent } from './state-dialog/state-dialog.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';

@Component({
  selector: 'app-welcome-screen2',
  templateUrl: './welcome-screen2.component.html',
  styleUrls: ['./welcome-screen2.component.css']
})
export class WelcomeScreen2Component implements OnInit {

  constructor(private dialog: MdDialog, private router:Router) { }
 	

    openDialog(): void {
        let dialogRef = this.dialog.open(StateDialogComponent, {
            width: '300px',
        });
        dialogRef.afterClosed().subscribe(result => {
      
        });
    }
    openDialog2(): void {
        let dialogRef = this.dialog.open(LanguageDialogComponent, {
            width: '300px',
        });
        dialogRef.afterClosed().subscribe(result => {
      
        });
    }
  
  	ngOnInit(){
    	localStorage['currentpath']=this.router.url;
  	}

}
