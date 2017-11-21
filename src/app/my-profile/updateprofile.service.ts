import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class UpdateprofileService {

  constructor(private http:Http) { }

  	updateProfilePicture(image,id): Observable<any>{
        let api = "http://52.15.178.19:3001/api/uploadProfilePicEncoded/"+id;
        let body= {
            image:image
        };
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

}
