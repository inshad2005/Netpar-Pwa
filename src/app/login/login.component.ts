import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule } from '@angular/material';
import { LoginModel } from './login.model.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../providers/app';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../otp/popup/popup.component';
import { Popup2Component } from '../otp/popup2/popup2.component'
import { SecurityDialogComponent } from '../otp/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from '../otp/security-dialog2/security-dialog2.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
	complexForm: FormGroup;
	loginModel: LoginModel = new LoginModel ();
  data;
  verifiedData;
  errorMessage;
  localData;
  securityDialogModel:any;
  fromPage;
  DOB;
 constructor(private dialog: MdDialog,private appProvider:AppProvider,private router: Router,private route:  ActivatedRoute, private loginService:LoginService,private formBuilder: FormBuilder) {
 	this.complexForm = formBuilder.group({
      'firstName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'lastName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'contactNumber':[null, Validators.compose([Validators.minLength(10),Validators.maxLength(10),Validators.required, Validators.pattern("[0-9]*")])]
    })
   this.securityDialogModel={}
  }

  ngOnInit() {
      this.data= this.appProvider.current.fromPageFlag;
  }

  onLogIn(){
    if (this.loginModel.mobileNumber.length==10) {
        if(this.data=="login"){
          this.loginModel.platform="Browser";
          this.loginService.Login(this.loginModel)
          .subscribe(data=>{
              if(data.respCode == 1){
               this.appProvider.current.firstName=data.info.firstName;
               this.appProvider.current.lastName=data.info.lastName;
               this.appProvider.current.district=data.info.district;
               this.appProvider.current.state=data.info.state;
               this.appProvider.current.block=data.info.block;
               console.log(this.appProvider.current.firstName);
                 if (localStorage['userInfo']) {
                    this.localData=JSON.parse(localStorage['userInfo']);
                       if (this.localData.mobileNumber == this.loginModel.mobileNumber) {
                         this.router.navigate(['/homepage'],{skipLocationChange:true});
                       }else {
                         this.securityDialog();
                       }
                 }else{
                   this.securityDialog();
                 }
              }
              else if(data.respCode == 2 ){
                this.appProvider.current.firstName=this.loginModel.firstName;
                this.appProvider.current.lastName=this.loginModel.lastName;
                // this.appProvider.current.previousMobileNumber=data.info.mobileNumber;
                this.errorMessage="incorrect mobile number";
                this.openDialog(this.errorMessage);
              }
              else if(data.respCode == 5 ){
                 this.errorMessage="Invalid User";
                 this.openDialog(this.errorMessage)
              }
              else if(data.respCode == 6){
                this.errorMessage="Only mobile number is matching";
                this.openDialog(this.errorMessage)
              }
              else if (data.respCode == 7) {
                this.errorMessage="First Name and Last Name not matching";
                this.openDialog(this.errorMessage);
              }
          },err=>{
            this.errorMessage="something went wrong"
            this.openDialog(this.errorMessage);
          })
          
        }
    }else{
      this.errorMessage="incorrect mobile number";
      this.openDialog(this.errorMessage);
      return 0
    }
  }

  onNext(){
    if (this.loginModel.mobileNumber.length==10) {
       this.loginService.VerifyMobile(this.loginModel.mobileNumber)
       .subscribe(data=>{
         this.verifiedData=data;
         if (this.verifiedData.success==true) {
           this.appProvider.current.firstName=this.loginModel.firstName;
           this.appProvider.current.lastName=this.loginModel.lastName;
           this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
           this.appProvider.current.newMobileNumber=this.loginModel.mobileNumber;
           this.appProvider.current.toOtpPageFlag="registerPage"
           this.router.navigate(['/otp'],{skipLocationChange:true});
          }  
          else if (this.verifiedData.success==false) {
            this.errorMessage="user already registered";
            this.openDialog(this.errorMessage);
          }     
       },err=>{
            this.errorMessage="something went wrong"
            this.openDialog(this.errorMessage);
       })
    }else{
      this.errorMessage="incorrect mobile number"
      this.openDialog(this.errorMessage);
      return 0
    }
  }


    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {

          if (result>2) {
            this.errorMessage="want to update new number"
            this.openagain(this.errorMessage);
          }
           if (result=="update mobile") {
              this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
              this.verifyUser();
          }
        });
    }

   openagain(msg){
      let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result>2) {
            this.errorMessage="want to update new number"
           // this.openDialog(this.errorMessage);

          }
          else if (result=="update mobile") {
              this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
              this.verifyUser();
          }
        });
   }



    verifyUser(){
       this.loginService.VerifyMobile(this.loginModel.mobileNumber).subscribe(data=>{
              if (data.success==false) {
                 this.errorMessage="user already registered";
                 this.openDialog(this.errorMessage);
              }else if (data.success==true) {
                this.appProvider.current.toOtpPageFlag="updateMobileNo";
                this.router.navigate(['/otp'],{skipLocationChange:true});
              }
              // alert(JSON.stringify(data));
            })
    }

    securityDialog(): void {
        let dialogRef = this.dialog.open(SecurityDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
          // alert(result)
          if (result.respCode==1) {
            this.securityDialog2();
          }else if (result.respCode==0) {
            this.errorMessage="entered detail does not match"
            this.openDialog(this.errorMessage);
          }
        });
    }

    securityDialog2(): void {
        let dialogRef = this.dialog.open(SecurityDialog2Component, {
           data:{ message:"from login"}
        });
        dialogRef.afterClosed().subscribe(result => {
          // alert(JSON.stringify(result));
          if (result.respCode == 1) {
            localStorage['userInfo']=JSON.stringify(result.info);
            // alert(localStorage['userInfo']);
            this.router.navigate(["/homepage"],{skipLocationChange:true})
          }else{
            this.errorMessage="gender or dob not matched";
            this.openDialog(this.errorMessage);
          }
        });
    }

}
