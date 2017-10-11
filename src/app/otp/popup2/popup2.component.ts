import { Component, OnInit,Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { UpdateMobileService } from '../../providers/update-mobile.service';
import { UpdateMobileModel } from './updateMobile.model.component'

@Component({
  selector: 'app-popup2',
  templateUrl: './popup2.component.html',
  styleUrls: ['./popup2.component.css'],
  providers:[UpdateMobileService]
})
export class Popup2Component implements OnInit {
	DOB;
	date;
	updateMobileModel:UpdateMobileModel=new UpdateMobileModel();

  constructor(private updateMobileService:UpdateMobileService,private appProvider:AppProvider,private dialog: MdDialog, public dialogRef: MdDialogRef<Popup2Component>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

 onUpdate(){
 	this.date=this.DOB.toString().split(" ");
    this.updateMobileModel.dateOfBirth=this.date[2]+"-"+this.date[1]+"-"+this.date[3];
 	this.updateMobileModel.firstName=this.appProvider.current.firstName;
 	this.updateMobileModel.lastName=this.appProvider.current.lastName;
 	this.updateMobileModel.mobileNumberNew=this.appProvider.current.mobileNumber;
 	this.updateMobileModel.state=this.appProvider.current.state
 	this.updateMobileModel.district=this.appProvider.current.district;
 	this.updateMobileModel.block=this.appProvider.current.block;
    this.updateMobileService.updateMobileNumber(this.updateMobileModel).subscribe(data=>{
    	if(data){
    		this.dialogRef.close(data);
    	}
    })
  }

}
