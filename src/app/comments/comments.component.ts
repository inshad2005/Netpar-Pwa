import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../providers/app'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private appProvider:AppProvider) { }
  userComments
  ngOnInit() {
  	this.userComments=this.appProvider.current.comments;
  	console.log(this.userComments)
  }

}
