import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdInputModule } from '@angular/material';
import { LoginModel } from './login.model.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OtpService } from '../providers/otp.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,OtpService]
})
export class LoginComponent implements OnInit {
	complexForm: FormGroup;
	loginModel: LoginModel = new LoginModel ();
 constructor(private router: Router, private loginService:LoginService,private formBuilder: FormBuilder,private otpService:OtpService) {
 	this.complexForm = formBuilder.group({
      'firstName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'lastName': [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])],
      'contactNumber':[null, Validators.compose([Validators.required, Validators.minLength(10), Validators.pattern("[0-9]*")])]
    })
  }

  ngOnInit() {
	
  }

  onLogIn(){
  	this.router.navigate(['/welcome'],{ skipLocationChange: true });
  	localStorage['aut']='true';
  }

  onSendOtp(){
    this.otpService.getOtp().subscribe(data=>{
      alert(data)
    },err=>{
      alert(err)
    })
  }
}
