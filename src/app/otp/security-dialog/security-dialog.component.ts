import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { StateService } from '../../providers/state.service';
import { SecurityModel } from './securty.model.component';
import { SecurityDialogService } from './security-dialog.service';
import { AppProvider } from '../../providers/app';
import { SecurityDialog2Component } from '../security-dialog2/security-dialog2.component';

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.css'],
  providers:[StateService,SecurityDialogService]
})
export class SecurityDialogComponent implements OnInit {
  states
  securityModel: SecurityModel= new SecurityModel();
  constructor(private appProvider:AppProvider,private dialog: MdDialog,private securityDialogService:SecurityDialogService ,public dialogRef: MdDialogRef<SecurityDialogComponent>,private stateService:StateService,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getStatelist();
  }

  onClosed(){
  	this.dialogRef.close();
  }

  getStatelist(){
    this.stateService.getStates().then(data=>{
      this.states=data;
    })
  }

  onOk(){

    this.securityModel.firstName=this.appProvider.current.firstName;
    this.securityModel.lastName=this.appProvider.current.lastName;
    this.securityDialogService.SecurityStep1(this.securityModel).subscribe(data=>{
      if (data) {
        this.appProvider.current.state=this.securityModel.state;
        this.appProvider.current.district=this.securityModel.district;
        this.appProvider.current.block=this.securityModel.block;
        this.dialogRef.close(data);
      }
    },err=>{

    })
  }
  
}
