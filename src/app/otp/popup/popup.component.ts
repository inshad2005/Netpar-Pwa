import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message;
  count;
  constructor(private appProvider:AppProvider,private dialog: MdDialog, public dialogRef: MdDialogRef<PopupComponent>,
  @Inject(MD_DIALOG_DATA) public data: any) { }

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
