import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AllPostsService {

  constructor(private http:Http) { }
	
	allPosts():  Observable<any> {
        let api =  environment.endPoint+"allPosts";
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    likePost(articleLikeData): Observable<any>{
        let api = environment.endPoint+"postLike";
        let body=articleLikeData;
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }
}
