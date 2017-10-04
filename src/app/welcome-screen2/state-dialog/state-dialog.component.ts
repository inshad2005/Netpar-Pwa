import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdListModule} from '@angular/material';


@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.css']
})
export class StateDialogComponent implements OnInit {
	
	constructor(private dialog: MdDialog, public dialogRef: MdDialogRef<StateDialogComponent>,
  	@Inject(MD_DIALOG_DATA) public data: any) { }

  	ngOnInit() {
  	}

  	onClosed(){
	  	this.dialogRef.close();
  	}


}
