import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class UpdateMobileService {

  constructor(private http:Http) { }


  updateMobileNumber(updateModel:any):  Observable<any> {
        let body = updateModel;
        let api =  environment.endPoint;
        return this.http.put(api+"updateMobileNumber",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
