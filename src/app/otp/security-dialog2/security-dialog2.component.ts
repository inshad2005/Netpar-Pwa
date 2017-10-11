import { Component, OnInit, Inject ,AfterViewInit} from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { SecurityDialogModel } from './security-dialog2.model.component';
import { SecurityDialog2Service } from './security-dialog2.service';
import {AppProvider} from '../../providers/app'

@Component({
  selector: 'app-security-dialog2',
  templateUrl: './security-dialog2.component.html',
  styleUrls: ['./security-dialog2.component.css'],
  providers:[SecurityDialog2Service]
})
export class SecurityDialog2Component implements AfterViewInit {
  securityDialogModel: SecurityDialogModel = new SecurityDialogModel();
  DOB;
  date;
  fromPage;
  constructor(private appProvider:AppProvider,private securityDialog2Service:SecurityDialog2Service,private dialog: MdDialog, public dialogRef: MdDialogRef<SecurityDialog2Component>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngAfterViewInit() {
    this.fromPage=this.data.message;
    // alert('hasgdjasd'+this.fromPage);
  }


  onClosed(){
  	this.dialogRef.close();
  }

  onOk(){
    this.date=this.DOB.toString().split(" ");
    this.securityDialogModel.dateOfBirth=this.date[2]+"-"+this.date[1]+"-"+this.date[3];
    this.securityDialogModel.firstName=this.appProvider.current.firstName;
    this.securityDialogModel.lastName=this.appProvider.current.lastName;
    this.securityDialogModel.state=this.appProvider.current.state
    this.securityDialogModel.district=this.appProvider.current.district
    this.securityDialogModel.block=this.appProvider.current.block
    this.securityDialog2Service.SecurityStep2(this.securityDialogModel).subscribe(data=>{
      // alert(JSON.stringify(data));
      this.dialogRef.close(data);
    },err=>{

    })
  }

}
