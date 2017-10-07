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
 constructor(private dialog: MdDialog,private appProvider:AppProvider,private router: Router,private route:  ActivatedRoute, private loginService:LoginService,private formBuilder: FormBuilder) {
 	this.complexForm = formBuilder.group({
      'firstName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'lastName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'contactNumber':[null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("[0-9]*")])]
    })
  }

  ngOnInit() {
      this.data= this.appProvider.current.fromPageFlag;
  }

  onLogIn(){
    if(this.data=="signup"){
      this.router.navigate(['/otp',{data:"signup",loginModel:JSON.stringify(this.loginModel)}])
    }
    else{
      this.router.navigate(['/otp'],{skipLocationChange:true});
    }
  }

  onNext(){
    this.loginService.VerifyMobile(this.loginModel.mobileNumber)
     .subscribe(data=>{
       this.verifiedData=data;
       if (this.verifiedData.success==true) {
         this.appProvider.current.firstName=this.loginModel.firstName;
         this.appProvider.current.lastName=this.loginModel.lastName;
         this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
         this.router.navigate(['/otp'],{skipLocationChange:true});
        }  
        else if (this.verifiedData.success==false) {
          this.openDialog();
        }     
       console.log(JSON.stringify(data));
     },err=>{
       console.log(JSON.stringify(err));
     })
  }


  openDialog(): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:"user already registered"}
        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }

}
