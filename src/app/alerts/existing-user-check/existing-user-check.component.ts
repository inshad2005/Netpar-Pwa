import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
@Component({
  selector: 'app-existing-user-check',
  templateUrl: './existing-user-check.component.html',
  styleUrls: ['./existing-user-check.component.css']
})
export class ExistingUserCheckComponent implements OnInit {

  constructor(private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<ExistingUserCheckComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }
  
 	onSignin(){
 		this.dialogRef.close("SignIn")
 	}

 	onUpdateMobileNumber(){
 		this.dialogRef.close("Update")
 	}


}
