import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
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

    downloadPost(postid,userid): Observable<any>{
        let api = environment.endPoint+"downloadDone/"+postid+"/"+userid;
        return this.http.get(api)
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

    viewPost(postid,userid){
        let api=environment.endPoint+"pageViewed/"+postid+"/"+userid;
         return this.http.get(api)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
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

    downloadFile(): Observable<any> {
        let options = new RequestOptions({responseType: ResponseContentType.Blob,headers:new Headers({
               "Access-Control-Allow-Origin":true
            }) 
        });
        return this.http.get("http://ionicteam.com/netpar/uploads/content/contentData/1509737827.jpeg",options)
            .map(res => res.blob())
            .catch(err=>{
                return err;
            })
    }
}
