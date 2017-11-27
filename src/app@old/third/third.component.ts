
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {
	@Input() amit:any

  constructor(private router:Router) { }

  ngOnInit() {
  }
	onLogOut(){

		localStorage.removeItem('isLoggedin');
		this.router.navigate(['/first'])
	}
}
