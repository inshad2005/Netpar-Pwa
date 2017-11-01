import { Component, OnInit } from '@angular/core';
import { StateService} from '../providers/state.service';
import { RegisterModel} from './register.model.component';
import { RegisterService} from './register.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PopupComponent } from '../alerts/popup/popup.component';
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
 month;
 days
 dateValue;
 totalYears=100;
 years;
 dd;
 mm;
 yy;
 loading=false;

  constructor(private formBuilder: FormBuilder,private appProvider:AppProvider,private dialog: MatDialog,private router:Router,private stateService:StateService,private registerService:RegisterService,private route:  ActivatedRoute) { 
    this.complexForm = formBuilder.group({
      'state': [null, Validators.compose([Validators.required])],
      'district': [null, Validators.compose([Validators.required])],
      'block':[null, Validators.compose([Validators.required])],
      'date':[null,Validators.compose([Validators.required])],
      'month':[null,Validators.compose([Validators.required])],
      'year':[null,Validators.compose([Validators.required])],
      'gender':[null,Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  	 this.getStatelist();
     this.getDays();
     this.getMonths();
     this. getYears();
  }

  getStatelist(){
  	this.stateService.getStates().then(data=>{
  		this.states=data;
  	})
  }

  onRegister(){
       // this.date=this.DOB.toString().split(" ");
     switch (this.mm) {
            case "Dec":
              this.month='12'
            break;
            case "Nov":
              this.month='11'
            break;
            case "Oct":
              this.month='10'
            break;
            case "Sep":
              this.month='09'
            break;
            case "Aug":
              this.month='08'
            break;
            case "Jul":
              this.month='07'
            break;
            case "Jun":
              this.month='06'
            break;
            case "May":
              this.month='05'
            break;
            case "Apr":
              this.month='04'
            break;
            case "Mar":
              this.month='03'
            break;
            case "Feb":
              this.month='02'
            break;
            case "Jan":
              this.month='01'
            break;
            default:
              break;
          }
       this.registerModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
       this.registerModel.firstName=this.appProvider.current.firstName;
       this.registerModel.lastName=this.appProvider.current.lastName;
       this.registerModel.firstName_eng=this.appProvider.current.firstName_eng;
       this.registerModel.lastName_eng=this.appProvider.current.lastName_eng;
       this.registerModel.mobileNumber=this.appProvider.current.mobileNumber;
       this.registerModel.platform="Browser";
       this.loading=true;
    	 this.registerService.Register(this.registerModel)
       .subscribe(data=>{
         if (data.success==true) {
           this.loading=false
           localStorage['userInfo']=JSON.stringify(data.response);
           console.log(localStorage['userInfo'])
           this.router.navigate(["/category-view"],{skipLocationChange:true});
         }
         else{
           this.loading=false
             this.openDialog();
         }
       },err=>{
         this.loading=false
         this.openDialog();
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
    getDays(){
        this.days = [];
        for(var i=1;i<=31;i++){
              if(i<=9){
                this.dateValue = '0' + i;
              } else {
                 this.dateValue = i;
              }
              this.days.push({value:this.dateValue});
        }
        // alert (JSON.stringify(this.days));
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
        // alert(JSON.stringify(this.months))
        return this.months;
    }


    getYears(){
      var currentYear = new Date().getFullYear();
      this.years=[];
      for (var i = currentYear; i > currentYear - this.totalYears; i--) {
          this.years.push({year: [i - 1]});
      }
      return this.years;
    }
}
