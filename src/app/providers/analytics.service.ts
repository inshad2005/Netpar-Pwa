import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';
declare var ga:any;
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

    trackEvent( action: string) {
        console.log("action"+ action)
        ga('send', 'pageview','/'+action);
    }

    trackView(tittle:string) {
        // if (this.platform.is('cordova') && ENV.analytics) {
        //     window.ga.trackView(tittle);
        // }
        ga('send', 'pageview');
    }

    sendEvent(article,eventAction){
        ga('send', 'event',  article , eventAction);
    }

    notification(userId){
        let api = environment.endPoint+"getNotifications/"+userId;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    templatateAnalayticUpdate(templateId,event){
        let body={}
        let api = environment.endPoint+"templatateAnalayticUpdate/"+templateId;
        if (event=="view") {
             body= {
                totalViews:"1"
            }
        }else{
            body ={
                totalClick:"1"
            }
        }
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }
}