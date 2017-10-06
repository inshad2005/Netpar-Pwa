import { Component, OnInit } from '@angular/core';
import { StateService} from '../providers/state.service';
import { RegisterModel} from './register.model.component';
import {RegisterService} from './register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[StateService,RegisterService]
})
export class RegisterComponent implements OnInit {
 states;
 registerModel: RegisterModel = new RegisterModel ();
  constructor(private stateService:StateService,private registerService:RegisterService) { }

  ngOnInit() {
  	this.getStatelist();
  }

  getStatelist(){
  	this.stateService.getStates().then(data=>{
  		this.states=data;
  	})
  }

  onRegister(){
  	
  }
}
