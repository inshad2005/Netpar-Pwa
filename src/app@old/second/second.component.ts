import { Component, OnInit } from '@angular/core';
import {AppProvider}from '../providers/app.provider'

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
   admindata
   status=true
  constructor( private app:AppProvider) { }

  ngOnInit() {
  }
   onShow(){
    this.status=false
   	this.admindata=this.app.current.adminData

   }

   onHide(){
     this.admindata=null
     this.status=true
   }
}
