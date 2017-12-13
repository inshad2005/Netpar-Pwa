import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AppProvider } from '../providers/app';
import { LoginModel } from '../login/login.model.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { ExistingUserCheckComponent } from '../alerts/existing-user-check/existing-user-check.component';
import { ActivatedRoute } from '@angular/router';

declare var google
@Component({
  selector: 'app-registeration-step-one',
  templateUrl: './registeration-step-one.component.html',
  styleUrls: ['./registeration-step-one.component.css'],
  providers:[LoginService]
})
export class RegisterationStepOneComponent implements OnInit {
  // @ViewChild('first') first:ElementRef;
  // @ViewChild('last') last:ElementRef;
  loginModel:LoginModel= new LoginModel();
  validationErrorMessage
  verifiedData;
  errorMessage;
  loading;
  refrralId;
  constructor(private route: ActivatedRoute,private dialog: MatDialog,private appProvider:AppProvider,private loginService:LoginService, private router:Router,private formBuilder: FormBuilder) { 
  

  }

  ngOnInit() {
    // var options = {
    //         sourceLanguage:
    //             google.elements.transliteration.LanguageCode.ENGLISH,
    //         destinationLanguage:
    //             [google.elements.transliteration.LanguageCode.MARATHI],
    //         shortcutKey: 'ctrl+g',
    //         transliterationEnabled: true
    //     };
    // var control = new google.elements.transliteration.TransliterationControl(options);
    // control.makeTransliteratable(['firstName','lastname']);
  }

   onNext(){
     let validate = {
        mobileNumber:this.loginModel.mobileNumber
      }
      if(!validate.mobileNumber){
        this.validationErrorMessage="mobile number missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }
      this.mainSignUpFunction();
    // this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
    // this.router.navigate(['/otp'],{skipLocationChange:false});
  }

  // onBlurFirstName(){
  //   this.appProvider.current.firstName_eng=this.loginModel.firstName;
  // }

  // onBlurLastName(){
  //   this.appProvider.current.lastName_eng=this.loginModel.lastName;
  // }

  mainSignUpFunction(){
         // this.loginModel.firstName=this.first.nativeElement.value;
         // this.loginModel.lastName=this.last.nativeElement.value;
          if (this.loginModel.mobileNumber.length==10) {
            this.loading=true
             this.loginService.VerifyMobile(this.loginModel.mobileNumber)
             .subscribe(data=>{
               this.verifiedData=data;
               if (this.verifiedData.success==true) {
                 // this.appProvider.current.firstName=this.first.nativeElement.value;
                 // this.appProvider.current.lastName=this.last.nativeElement.value;
                 this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
                 this.appProvider.current.newMobileNumber=this.loginModel.mobileNumber;
                 this.appProvider.current.toOtpPageFlag="registerPage";
                 this.loading=false
                 this.router.navigate(['/otp'],{skipLocationChange:false});

                }  
                else if (this.verifiedData.success==false) {
                  this.errorMessage="user already registered";
                  this.openDialog(this.errorMessage);
                  this.loading=false

                }     
             },err=>{
                  this.errorMessage="something went wrong"
                  this.openDialog(this.errorMessage);
                  this.loading=false

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
          if (result) {
          
          }
        });
    }

    onExistingUser(){
      let dialogRef = this.dialog.open(ExistingUserCheckComponent, {
          width: '290px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
           if(result=="SignIn"){
            this.appProvider.current.loginOrUpdateFlag="SignIn" ;
            this.router.navigate(['/login'],{skipLocationChange:false})
           }else if (result=="Update") {
             this.appProvider.current.loginOrUpdateFlag="Update";
             this.router.navigate(['/login'],{skipLocationChange:false})
           }
        }
      });
    }

    openValidationAlert(msg){
        let dialogRef = this.dialog.open(ValidationBoxesComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
    }

    
}
