import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AllPostsService {

  constructor(private http:Http) { }
	
	allPosts(userId):  Observable<any> {
        let api =  environment.endPoint+"allPosts/"+userId;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    likePost(articleLikeData): Observable<any>{
        let api = environment.endPoint+"postLike";
        let body= articleLikeData;
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    commentPost(articleCommentData): Observable<any>{
        let api = environment.endPoint+"postComment";
        let body = articleCommentData;
        return this.http.post(api,body)
        .map(response=>{
             return response.json();
        }).catch(error => {
            return error
        })
    }

    savePost(savePostData):Observable<any>{
        let api = environment.endPoint+"savePost"
        let body = savePostData
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    getSavedPosts(userId):Observable<any>{
        let api=environment.endPoint+"savedPosts/"+userId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }
}
