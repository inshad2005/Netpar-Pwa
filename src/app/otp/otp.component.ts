import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { SecurityDialogComponent } from './security-dialog/security-dialog.component';
import { SecurityDialog2Component } from './security-dialog2/security-dialog2.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  	constructor(private dialog: MdDialog) { }
  	ngOnInit() {

  	}
    openDialog(): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
        });
        dialogRef.afterClosed().subscribe(result => {
			this.securityDialog();
        });
    }

    securityDialog(): void {
        let dialogRef = this.dialog.open(SecurityDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
      		this.securityDialog2();
        });
    }

    securityDialog2(): void {
        let dialogRef = this.dialog.open(SecurityDialog2Component, {
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

	changeFocus(el){
		el.focus();
	}
	setfocus(var2){
		var2.focus();
	}
}
