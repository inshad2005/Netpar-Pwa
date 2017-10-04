import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-security-dialog',
  templateUrl: './security-dialog.component.html',
  styleUrls: ['./security-dialog.component.css']
})
export class SecurityDialogComponent implements OnInit {

  constructor(private dialog: MdDialog, public dialogRef: MdDialogRef<SecurityDialogComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClosed(){
  	this.dialogRef.close();
  }
  
}
