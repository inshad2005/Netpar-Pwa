import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments;
  constructor(private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<CommentsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  	this.comments=this.data.comments;
  	console.log(JSON.stringify(this.comments))
  }

  onClosed(){
    
  }

}
