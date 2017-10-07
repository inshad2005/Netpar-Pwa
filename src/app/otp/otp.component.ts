import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { SecurityDialogComponent } from './security-dialog/security-dialog.component';
import { SecurityDialog2Component } from './security-dialog2/security-dialog2.component';
import { Params, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OtpService } from '../providers/otp.service';
import { AppProvider } from '../providers/app'

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  providers:[OtpService]
})

export class OtpComponent implements OnInit {
  data;
  loginModel;
  mobileNo;
  optResponse;
  validateResponse;
  sessionId;
  otp=null;
  value1;
  value2;
  value3;
  value4;
  value5;
  value6;
 
  	constructor(private appProvider:AppProvider,private router: Router,private dialog: MdDialog,private route:  ActivatedRoute,private otpService:OtpService) { }
  	ngOnInit() {
      this.route.params.forEach((params: Params) => {
            this.data= params['data'];
            this.loginModel=params['loginModel'];
            this.mobileNo=this.appProvider.current.mobileNumber;
        });
      this.onSendOtp(this.mobileNo);
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


	setfocus(cState,back,forword){
    console.log(cState,back,forword);
    if(cState==1){
      if(this.value1.length==0){

      }else if(this.value1.length>0){
        forword.focus();
      }
    }
    if(cState==2){
      if(this.value2.length==0){
        back.focus();
      }else if(this.value2.length>0){
        forword.focus();
      }
    }
    if(cState==3){
      if(this.value3.length==0){
        back.focus();
      }else if(this.value3.length>0){
        forword.focus();
      }
    }
    if(cState==4){
      if(this.value4.length==0){
        back.focus();
      }else if(this.value4.length>0){
        forword.focus();
      }
    }
    if(cState==5){
      if(this.value5.length==0){
        back.focus();
      }else if(this.value5.length>0){
        forword.focus();
      }
    }
     if(cState==6){
      if(this.value6.length==0){
        back.focus();
      }else if(this.value6.length>0){
        this.otp=this.value1+this.value2+this.value3+this.value4+this.value5+this.value6;
      }
    }
	}


  onSubmit(){
    if (this.data=="signup") {
      this.router.navigate(["/register",{skipLocationChange:true}]);
    }
    else{
      this.securityDialog2();
    }
  }

  onSendOtp(mobileNo){
    this.otpService.getOtp(mobileNo).subscribe(data=>{
      this.optResponse=data.json()
      console.log(this.optResponse);
      this.sessionId=this.optResponse.Details;
    },err=>{
      console.log(err);   
    })
  }

  onValidateOtp(){
    this.otpService.verifyOtp(this.sessionId,this.otp).subscribe(data=>{
      alert(data);
      this.validateResponse=data.json();
      if(this.validateResponse.Status == "Success"){
        this.router.navigate(["/register",{skipLocationChange:true}]);
      }else{
        alert('else')
        this.openDialog();
      }
    },err=>{
      console.log(err.status);
    })
  }
}
