import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-is-this-you',
  templateUrl: './is-this-you.component.html',
  styleUrls: ['./is-this-you.component.css']
})
export class IsThisYouComponent implements OnInit {
	userInfo
  constructor(private router:Router,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<IsThisYouComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  	console.log(JSON.stringify(data));
  	this.userInfo=data.data.info;
   }

  ngOnInit() {
  }

  onYes(){
  	this.dialogRef.close("updateMobileNumber")
  }

  onNo(){
  	this.dialogRef.close("no");
  }

}
