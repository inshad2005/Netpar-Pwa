import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { Popup2Component } from '../alerts/popup2/popup2.component'
import { SecurityDialogComponent } from '../alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from '../alerts/security-dialog2/security-dialog2.component';
import { Params, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OtpService } from '../providers/otp.service';
import { AppProvider } from '../providers/app';
import { UpdateMobileService } from '../providers/update-mobile.service';
import { UpdateMobileNo } from './updateMobileNo.model.component';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  providers:[OtpService,UpdateMobileService]
})

export class OtpComponent implements OnInit {
  updateMobileNo:UpdateMobileNo=new UpdateMobileNo()
  data;
  loginModel;
  mobileNo;
  optResponse;
  validateResponse;
  sessionId;
  errorMessage;
  otp=null;
  value1;
  value2;
  value3;
  value4;
  value5;
  value6;
  generatedOtp
 
  	constructor(private updateMobileService:UpdateMobileService,private appProvider:AppProvider,private router: Router,private dialog: MatDialog,private route:  ActivatedRoute,private otpService:OtpService) { }
    
  	ngOnInit() {
      if (this.appProvider.current.toOtpPageFlag=="updateMobileNo") {
        this.mobileNo=this.appProvider.current.newMobileNumber;
      }else{
        this.mobileNo=this.appProvider.current.mobileNumber;
      }
       if (this.mobileNo) {
          this.onSendOtp(this.mobileNo);
       }
  	}

    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result=="update mobile") {
            this.securityDialog();
          }
          else if (result=="updated successfuly") {
           this.router.navigate(['/category-view'],{skipLocationChange:true})
          }
          else if(result=="ResendOtp"){
              this.onSendOtp(this.mobileNo);
          } 
        });
    }

     openDialog2(msg): void {
        let dialogRef = this.dialog.open(Popup2Component, {
            width: '400px', 
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // alert(JSON.stringify(result.success));
            if (result.success==true) {
              this.errorMessage="mobile number updated"
              this.openDialog(this.errorMessage);
            }
          }
  
        });
    }

    securityDialog(): void {
        let dialogRef = this.dialog.open(SecurityDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
           if (result.respCode==1) {
            this.openDialog2("hi");
          }else if (result.respCode==0) {
            this.errorMessage="entered detail does not match"
            this.openDialog(this.errorMessage);
          }
        });
    }

    securityDialog2(): void {
        let dialogRef = this.dialog.open(SecurityDialog2Component, {
          data:{ message:"fromUpdate"}
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }


	setfocus(cState,back,forword){
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


  // onSubmit(){
  //   if (this.data=="signup") {
  //     this.router.navigate(["/register",{skipLocationChange:true}]);
  //   }
  //   else{
  //     this.securityDialog2();
  //   }
  // }

  onSendOtp(mobileNo){
    this.generatedOtp=Math.floor(Math.random() * 1000000);
    this.otpService.sendOtp(mobileNo,this.generatedOtp).subscribe(data=>{
      if (data.Status == "Success") {
       this.appProvider.current.otp=data.otp;
       console.log("otp saved"+ data.otp);
      }
    },err=>{
      this.errorMessage="incorrect mobile number";
      this.openDialog(this.errorMessage);  
    })
  }

  // onValidateOtp(){
  //   // this.securityDialog();
  //   this.otpService.verifyOtp(this.sessionId,this.otp).subscribe(data=>{
  //     this.validateResponse=data.json();
  //     if(this.validateResponse.Status == "Success"){
  //       // this.router.navigate(["/register",{skipLocationChange:true}]);
  //       if (this.appProvider.current.toOtpPageFlag=="registerPage") {
  //         this.router.navigate(["/register",{skipLocationChange:true}]);
  //       }
  //       else if(this.appProvider.current.toOtpPageFlag=="updateMobileNo"){
  //           this.securityDialog();
  //       }
  //     }else{
  //       this.errorMessage="incorrect mobile number";
  //       this.openDialog(this.errorMessage);
  //     }
  //   },err=>{
  //     console.log(err.status);
  //   })
  // }

  onValidateOtp(){
      if(this.otp == this.appProvider.current.otp){
          if (this.appProvider.current.toOtpPageFlag=="registerPage") {
            this.router.navigate(["/register"],{skipLocationChange:true});
          }
          if (this.appProvider.current.toOtpPageFlag=="SingIn") {
            localStorage.setItem('isLoggedin', 'true');
            localStorage['userInfo']=JSON.stringify(this.appProvider.current.userData);
            localStorage['profileImage']=this.appProvider.current.userData.userImage;
            this.router.navigate(["/category-view"],{skipLocationChange:true})
          }
          else if(this.appProvider.current.toOtpPageFlag=="updateMobileNo"){
              this.onUpdate();
          }
      }else{
        this.errorMessage="Invalid otp";
        this.openDialog(this.errorMessage);
      }
  }

  onUpdate(){
    this.updateMobileNo.mobileNumberNew=this.mobileNo;
    this.updateMobileNo.mobileNumber=this.appProvider.current.previousMobileNumber;
    this.updateMobileService.updateMobileNumber(this.updateMobileNo).subscribe(data=>{
       localStorage['userInfo']=JSON.stringify(data.info);
       localStorage.setItem('isLoggedin', 'true');
       localStorage['profileImage']=data.info.userImage;
       this.router.navigate(['/category-view'],{skipLocationChange:true})
    },error=>{

    })
  }
}
