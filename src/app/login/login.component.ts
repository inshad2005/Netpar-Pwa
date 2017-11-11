import { Component, OnInit,ViewChild,ElementRef,AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material';
import { LoginModel,LoginEngModel } from './login.model.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../providers/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { Popup2Component } from '../alerts/popup2/popup2.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { SecurityDialogComponent } from '../alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from '../alerts/security-dialog2/security-dialog2.component';
import { RecheckDetailsComponent } from '../alerts/recheck-details/recheck-details.component';
import { IsThisYouComponent } from '../alerts/is-this-you/is-this-you.component';
import { UpdateMobileNumberComponent } from '../alerts/update-mobile-number/update-mobile-number.component'

declare var google
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
 mobileNumber
 validationErrorMessage
 errorMessage
 loginOrUpdate
 loading=false;
 constructor(private dialog: MatDialog,private appProvider:AppProvider,private router: Router,private route:  ActivatedRoute, private loginService:LoginService,private formBuilder: FormBuilder) {
   console.log(this.appProvider.current.loginOrUpdateFlag);
   this.loginOrUpdate=this.appProvider.current.loginOrUpdateFlag;
  }


    ngOnInit() {

    }

    onNewUser(){
     this.router.navigate(['/registerationStepOne'],{skipLocationChange:true})
    }

    onLogIn(){
      let validate = {
        mobileNumber:this.mobileNumber
      }
      if(!validate.mobileNumber){
        this.validationErrorMessage="mobile number missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else{
        if (this.mobileNumber.length==10){
            if(this.appProvider.current.loginOrUpdateFlag=="SignIn"){
              this.loginFunction(this.mobileNumber); 
            }else if(this.appProvider.current.loginOrUpdateFlag=="Update"){
              this.updateMobileNumber(this.mobileNumber);
            }
        }else{
          this.validationErrorMessage="incorrect mobile number";
          this.openValidationAlert(this.validationErrorMessage);
          return 0
        }
      }

    }

    openValidationAlert(msg){
      let dialogRef = this.dialog.open(ValidationBoxesComponent, {
          width: '260px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    openRecheckDetails(){
      let dialogRef = this.dialog.open(RecheckDetailsComponent, {
          width: '320px'
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    loginFunction(mobileNumber){
      console.log("login fuction");
      this.loading=true
      this.loginService.VerifyMobile(mobileNumber).subscribe(data=>{
        console.log(data);
        this.loading=false
        if (data.msg=="This mobile number already exists in database!!") {
          this.appProvider.current.mobileNumber=this.mobileNumber;
          this.appProvider.current.toOtpPageFlag="SingIn";
          this.appProvider.current.userData=data.info;
          this.router.navigate(['/otp'],{skipLocationChange:true});
        }else if(data.msg=="New User!!"){
          if (this.appProvider.current.incorrectMobileDetailCount==0) {
            this.openRecheckDetails();
          }else if(this.appProvider.current.incorrectMobileDetailCount>0){
            this.errorMessage="you are not registered"
            this.openDialog(this.errorMessage);
          }
        }
      },error=>{
          this.loading=false;
          this.errorMessage="something went wrong"
          this.openDialog(this.errorMessage);
          return 0
      })
    }

    updateMobileNumber(mobileNumber){
      this.loading=true;
      console.log("update function");
      this.appProvider.current.previousMobileNumber=this.mobileNumber;
      this.loginService.VerifyMobile(mobileNumber).subscribe(data=>{
        this.loading=false;
        if (data.msg=="This mobile number already exists in database!!"){
          this.appProvider.current.firstName=data.info.firstName;
          this.appProvider.current.lastName=data.info.lastName;
          this.appProvider.current.userData=data.info;
          this.isThisYouDialog(data);
        }else{
          this.errorMessage="you are not registered"
          this.openDialog(this.errorMessage);
        }
      },error=>{
          this.loading=false;
          this.errorMessage="something went wrong"
          this.openDialog(this.errorMessage);
      })
    }

    isThisYouDialog(userData): void {
        let dialogRef = this.dialog.open(IsThisYouComponent, {
            width: '240px',
            data:{ data:userData}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="updateMobileNumber") {
              this.securityDialog();
            }if (result=="no") {
               this.errorMessage="please Signup"
              this.openDialog(this.errorMessage);
            }
          }
        });
    }

    securityDialog(): void {
      let dialogRef = this.dialog.open(SecurityDialogComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
       if(result){
          if (result.respCode==1) {
            this.securityDialog2();
          }else if (result.respCode==0) {
            this.errorMessage="entered detail does not match"
            this.openDialog(this.errorMessage);
          }
       }
      });
    }

    securityDialog2(): void {
      let dialogRef = this.dialog.open(SecurityDialog2Component, {
         data:{ message:"from login"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.respCode == 1) {
            this.openUpdateMobileDialog();
          }else{
            this.errorMessage="gender or dob not matched";
            this.openDialog(this.errorMessage);
          }
        }
      });
    }

    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          
          }
        });
    }

    openUpdateMobileDialog(): void {
        let dialogRef = this.dialog.open(UpdateMobileNumberComponent, {
            width: '240px'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="updateNewMobileNumber") {
              this.loading=true;
              this.loginService.VerifyMobile(this.appProvider.current.newMobileNumber).subscribe(data=>{
                this.loading=false
                if (data.msg=="This mobile number already exists in database!!"){
                    this.errorMessage="user already registered";
                    this.openDialog(this.errorMessage);
                }else{
                  this.appProvider.current.toOtpPageFlag="updateMobileNo";
                  this.router.navigate(["/otp"],{skipLocationChange:true})
                }
              },error=>{
                  this.loading=false;
                  this.errorMessage="something went wrong"
                  this.openDialog(this.errorMessage);
              })
            }
          }
        });
    }


    

  //   onLogIn(){
  //     let validate = {
  //       firstName: this.loginEngModel.firstName_eng,
  //       lastName: this.loginEngModel.lastName_eng,
  //       mobileNumber:this.loginEngModel.mobileNumber
  //     }
  //     if (!validate.firstName) {
  //       this.validationErrorMessage="first name missing"
  //       this.openValidationAlert(this.validationErrorMessage);
  //       return
  //     } if (!validate.lastName) {
  //       this.validationErrorMessage="last name missing"
  //       this.openValidationAlert(this.validationErrorMessage);
  //       return
  //     } if(!validate.mobileNumber){
  //       this.validationErrorMessage="mobile number missing"
  //       this.openValidationAlert(this.validationErrorMessage);
  //       return
  //     }
  //     this.mainLoginFunction();
  //   }

  //   mainLoginFunction(){
  //       if (this.loginEngModel.mobileNumber.length==10) {
  //           this.loginButton=false;
  //           this.loginEngModel.platform="Browser";
  //           this.loginEngModel.firstName=this.loginEngModel.firstName_eng;
  //           this.loginEngModel.lastName=this.loginEngModel.lastName_eng;
  //           this.loading=true;
  //           this.loginService.Login(this.loginEngModel)
  //           .subscribe(data=>{
  //               this.loginButton=true;
  //               if(data.respCode == 1){
  //                 this.appProvider.current.firstName=data.info.firstName;
  //                 this.appProvider.current.lastName=data.info.lastName;
  //                 this.appProvider.current.district=data.info.district;
  //                 this.appProvider.current.state=data.info.state;
  //                 this.appProvider.current.block=data.info.block;
  //                 if (localStorage['userInfo']) {
  //                     this.localData=JSON.parse(localStorage['userInfo']);
  //                     if (this.localData.mobileNumber == this.loginEngModel.mobileNumber) {
  //                         this.loading=false;
  //                         this.openDialog("welcome back");
  //                         this.router.navigate(['/category-view'],{skipLocationChange:true});
  //                     }else {
  //                       this.securityDialog();
  //                       this.loading=false
  //                     }
  //                 }else{
  //                    this.securityDialog();
  //                    this.loading=false
  //                  }
  //               }
  //               else if(data.respCode == 2 ){
  //                 this.appProvider.current.firstName=this.loginEngModel.lastName_eng;
  //                 this.appProvider.current.lastName=this.loginEngModel.lastName_eng;
  //                 // this.appProvider.current.previousMobileNumber=data.info.mobileNumber;
  //                 this.errorMessage="incorrect mobile number";
  //                 this.openDialog(this.errorMessage);
  //                 this.loading=false

  //               }
  //               else if(data.respCode == 5 ){
  //                  this.errorMessage="Invalid User";
  //                  this.openDialog(this.errorMessage);
  //                  this.loading=false

  //               }
  //               else if(data.respCode == 6){
  //                 this.errorMessage="Only mobile number is matching";
  //                 this.openDialog(this.errorMessage);
  //                 this.loading=false
  //               }
  //               else if (data.respCode == 7) {
  //                 this.errorMessage="First Name and Last Name not matching";
  //                 this.openDialog(this.errorMessage);
  //                 this.loading=false

  //               }
  //           },err=>{
  //             this.loading=false
  //             this.loginButton=true;
  //             this.errorMessage="something went wrong"
  //             this.openDialog(this.errorMessage);
  //           })
  //       }else{
  //         this.validationErrorMessage="incorrect mobile number";
  //         this.openValidationAlert(this.validationErrorMessage);
  //         return 0
  //       }
  //   }

  //   openDialog(msg): void {
  //       let dialogRef = this.dialog.open(PopupComponent, {
  //           width: '260px',
  //           data:{ message:msg}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         if (result) {
  //           if (result>2) {
  //             this.errorMessage="want to update new number"
  //             this.openagain(this.errorMessage);
  //           }
  //           if (result=="update mobile") {
  //             this.appProvider.current.mobileNumber=this.loginEngModel.mobileNumber;
  //             this.verifyUser();
  //           }
  //           if (result=="Signup") {
  //             this.resetForSignUp();
  //           }
  //         }
  //       });
  //   }

  //  openagain(msg){
  //     let dialogRef = this.dialog.open(PopupComponent, {
  //           width: '260px',
  //           data:{ message:msg}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         if (result>2) {
  //           this.errorMessage="want to update new number"
  //          // this.openDialog(this.errorMessage);

  //         }
  //         else if (result=="update mobile") {
  //             this.appProvider.current.mobileNumber=this.loginEngModel.mobileNumber;
  //             this.verifyUser();
  //         }
  //       });
  //  }

  // verifyUser(){
  //     this.loginService.VerifyMobile(this.loginEngModel.mobileNumber).subscribe(data=>{
  //         if (data.success==false) {
  //            this.errorMessage="user already registered";
  //            this.openDialog(this.errorMessage);
  //         }else if (data.success==true) {
  //           this.appProvider.current.toOtpPageFlag="updateMobileNo";
  //           this.router.navigate(['/otp'],{skipLocationChange:true});
  //         }
  //         // alert(JSON.stringify(data));
  //     })
  // }

  //   securityDialog(): void {
  //       let dialogRef = this.dialog.open(SecurityDialogComponent, {
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //        if(result){
  //           if (result.respCode==1) {
  //             this.securityDialog2();
  //           }else if (result.respCode==0) {
  //             this.errorMessage="entered detail does not match"
  //             this.openDialog(this.errorMessage);
  //           }
  //        }
  //       });
  //   }

  //   securityDialog2(): void {
  //       let dialogRef = this.dialog.open(SecurityDialog2Component, {
  //          data:{ message:"from login"}
  //       });
  //       dialogRef.afterClosed().subscribe(result => {
  //         if (result) {
  //           if (result.respCode == 1) {
  //             localStorage['userInfo']=JSON.stringify(result.info);
  //             this.router.navigate(["/category-view"],{skipLocationChange:true})
  //           }else{
  //             this.errorMessage="gender or dob not matched";
  //             this.openDialog(this.errorMessage);
  //           }
  //         }
  //       });
  //   }

  //   onNewUser(){
  //    this.router.navigate(['/registerationStepOne'],{skipLocationChange:true})
  //   }

  //   resetForSignUp(){
  //      this.router.navigate(['/registerationStepOne'])
  //   }


}
