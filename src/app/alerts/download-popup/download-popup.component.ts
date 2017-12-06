import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
@Component({
  selector: 'app-download-popup',
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss']
})
export class DownloadPopupComponent implements OnInit {

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DownloadPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  	setTimeout(() => {
        this.onClosedialog()
      }, 30000);
  }

  onClosedialog(){
  	this.dialogRef.close("navigateToPlayStore")
  }

}
