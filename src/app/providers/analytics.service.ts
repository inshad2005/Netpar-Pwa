import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AnalyticsService {

  constructor(private http:Http) { }
	
	appUsingTime(userId,time):  Observable<any> {
        let api =  environment.endPoint+"updateTimeCount/"+userId+'/'+time;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    updateSessionCount(userId){
        let api = environment.endPoint+"updateSessionCount/"+userId;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}