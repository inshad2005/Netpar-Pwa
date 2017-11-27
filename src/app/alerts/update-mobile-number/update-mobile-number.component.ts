import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-mobile-number',
  templateUrl: './update-mobile-number.component.html',
  styleUrls: ['./update-mobile-number.component.css'],

})
export class UpdateMobileNumberComponent implements OnInit {
	mobileNumber
	complexForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router:Router,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<UpdateMobileNumberComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  	this.complexForm = formBuilder.group({
      'mobileNumber':[null,Validators.compose([Validators.required])],
    })
   }

  ngOnInit() {
  }

  onUpdate(){
  	this.appProvider.current.newMobileNumber=this.mobileNumber
  	this.dialogRef.close("updateNewMobileNumber")
  }

}
