import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class OtpService {

  constructor(private http:Http) { }

  getOtp(mobileNumber):  Observable<any> {
        let api =  "https://2factor.in/API/V1/c9b948e1-8bb7-11e7-94da-0200cd936042/SMS/+91"+mobileNumber+"/AUTOGEN";
        return this.http.get(api)
        .map(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    verifyOtp(sessionId,otp):  Observable<any>{
        let api = "https://2factor.in/API/V1/c9b948e1-8bb7-11e7-94da-0200cd936042/SMS/VERIFY/"+sessionId+"/"+otp;
        return this.http.get(api)
        .map(response => {
            return response;
        }).catch(error => {
            if (error.status == 400) {
                alert('error');
                return error
            }
        });
    }

}
