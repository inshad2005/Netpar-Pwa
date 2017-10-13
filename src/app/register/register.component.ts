import { Component, OnInit } from '@angular/core';
import { StateService} from '../providers/state.service';
import { RegisterModel} from './register.model.component';
import { RegisterService} from './register.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
 complexForm: FormGroup;
 states;
 registerModel: RegisterModel = new RegisterModel ();
 date;
 DOB
 months;

  constructor(private formBuilder: FormBuilder,private appProvider:AppProvider,private dialog: MdDialog,private router:Router,private stateService:StateService,private registerService:RegisterService,private route:  ActivatedRoute) { 
    this.complexForm = formBuilder.group({
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'block':[null, Validators.compose([Validators.required])],
      'dob':[null,Validators.compose([Validators.required])],
      'gender':[null,Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  	this.getStatelist();
    // this.getDays();
    // this.getMonths();
  }

  getStatelist(){
  	this.stateService.getStates().then(data=>{
  		this.states=data;
  	})
  }

  onRegister(){
       this.date=this.DOB.toString().split(" ");
       this.registerModel.dateOfBirth=this.date[2]+"-"+this.date[1]+"-"+this.date[3];
       this.registerModel.firstName=this.appProvider.current.firstName;
       this.registerModel.lastName=this.appProvider.current.lastName;
       this.registerModel.mobileNumber=this.appProvider.current.mobileNumber;
       this.registerModel.platform="Browser";
    	 this.registerService.Register(this.registerModel)
       .subscribe(data=>{
         if (data.success==true) {
           localStorage['userInfo']=JSON.stringify(data.info);
           this.router.navigate(["/category-view"],{skipLocationChange:true});
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

    // ----------------------------calender------------------
    // getDays(){
    //     this.days = [];
    //     for(var i=1;i<=31;i++){
    //           if(i<=9){
    //             this.dateValue = '0' + i;
    //           } else {
    //              this.dateValue = i;
    //           }
    //           this.days.push({value:this.dateValue});
    //     }
    //     // alert (JSON.stringify(this.days));
    //     return this.days;
    // }

    // getMonths(){
    //   var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //   this.months = [];
    //   for(var i=1;i<=12;i++){
    //     this.months.push({name: monthNames[i - 1]});
    //   }
    //     // alert(JSON.stringify(this.months))
    //     return this.months;
    // }
}
