import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class OtpService {

  constructor(private http:Http) { }

  getOtp():  Observable<any> {
        let api =  "https://2factor.in/API/V1/c9b948e1-8bb7-11e7-94da-0200cd936042/SMS/+919914677420/AUTOGEN";
    //     let options = new RequestOptions({
	   //      headers: new Headers({
	   //          "Accept":"application/xml",
	   //           "Access-Control-Allow-Origin":"https://2factor.in",
	   //           "Access-Control-Allow-Credentials": true
				// // "Accept-Encoding":"gzip, deflate, br",
				// // "Accept-Language":"en-US,en;q=0.8",
				// // "Access-Control-Allow-Origin":"*",
				// // "Connection":"keep-alive"
	   //      }),
    	// });
        return this.http.get(api)
        .map(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

}
