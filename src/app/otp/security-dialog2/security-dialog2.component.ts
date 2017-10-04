import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-security-dialog2',
  templateUrl: './security-dialog2.component.html',
  styleUrls: ['./security-dialog2.component.css']
})
export class SecurityDialog2Component implements OnInit {

  constructor(private dialog: MdDialog, public dialogRef: MdDialogRef<SecurityDialog2Component>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClosed(){
  	this.dialogRef.close();
  }

}
