import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  test2:any
  
  constructor() { }

  ngOnInit() {
  	this.test2=this.test.toISOString()
  }

}
