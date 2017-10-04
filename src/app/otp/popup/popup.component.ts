import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdListModule} from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private dialog: MdDialog, public dialogRef: MdDialogRef<PopupComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  	
  }

  onClosed(){
  	this.dialogRef.close();
  }
}
