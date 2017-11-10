import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message;
  count;
  constructor(private router:Router,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<PopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // this.message=this.data.message;
    this.messages();
  }

  onClosed(){
    if (this.count) {
      this.dialogRef.close(this.count);
    }else{
      this.dialogRef.close();
    }
  	
  }

  messages(){
    this.message=this.data.message;
    if (this.message == "incorrect mobile number") {
       this.appProvider.current.incorrectMobileDetailCount++    
      // alert(this.appProvider.current.incorrectMobileDetailCount);
      if (this.appProvider.current.incorrectMobileDetailCount>2) {
        this.count=this.appProvider.current.incorrectMobileDetailCount
       // this.dialogRef.close(this.count);
      }
    }
  }

  onUpdate(){
    this.dialogRef.close("update mobile");
  }

  onUpdatedSuccessfuly(){
    this.dialogRef.close("updated successfuly");
  }

  onSignup(){
    this.dialogRef.close("Signup");
    this.router.navigate(['/registerationStepOne'],{skipLocationChange:true})
  }

  onResend(){
    this.dialogRef.close("ResendOtp");
  }

  // onOk(){
  //   if (this.appProvider.current.incorrectMobileDetailCount>=2) {
  //       this.count=this.appProvider.current.incorrectMobileDetailCount
  //       this.dialogRef.close(this.count);
  //   }
  //   else{
  //     this.dialogRef.close();
  //   }
  // }
}
