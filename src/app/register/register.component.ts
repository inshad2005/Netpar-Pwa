import { Component, OnInit } from '@angular/core';
import { StateService} from '../providers/state.service';
import { RegisterModel} from './register.model.component';
import { RegisterService} from './register.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../otp/popup/popup.component';
import { Params, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppProvider } from '../providers/app';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[StateService,RegisterService]
})
export class RegisterComponent implements OnInit {
 states;
 loginModel;
 registerModel: RegisterModel = new RegisterModel ();
 previousData;
 dd;
 mm;
 yy;
  constructor(private appProvider:AppProvider,private dialog: MdDialog,private router:Router,private stateService:StateService,private registerService:RegisterService,private route:  ActivatedRoute) { }

  ngOnInit() {
  	this.getStatelist();
    this.registerModel.firstName=this.appProvider.current.firstName;
    this.registerModel.lastName=this.appProvider.current.lastName;
    this.registerModel.mobileNumber=this.appProvider.current.mobileNumber;
    this.registerModel.platform="Browser";
  }

  getStatelist(){
  	this.stateService.getStates().then(data=>{
  		this.states=data;
  	})
  }

  onRegister(){
    this.registerModel.dateOfBirth=this.dd+"-"+this.mm+"-"+this.yy;
  	this.registerService.Register(this.registerModel)
     .subscribe(data=>{
       if (data.success==true) {
         this.router.navigate(["/homepage"],{skipLocationChange:true});
       }
       else{
           this.openDialog();
       }
     },err=>{
       console.log(JSON.stringify(err));
     })
  }

   openDialog(): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:"something went wrong"}
        });
        dialogRef.afterClosed().subscribe(result => {
           
        });
    }
}
