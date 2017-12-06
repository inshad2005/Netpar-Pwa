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

    viewPost(postid,userid,sectionid,categoryid){
        let api=environment.endPoint+"pageViewed/"+postid+"/"+userid+"/"+sectionid+"/"+categoryid;
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

    // downloadFile(): Observable<any> {
    //     let options = new RequestOptions({responseType: ResponseContentType.Blob,headers:new Headers({
    //            "Access-Control-Allow-Origin":true
    //         }) 
    //     });
    //     return this.http.get("http://ionicteam.com/netpar/uploads/content/contentData/1509737827.jpeg",options)
    //     .map(res => res.blob())
    //     .catch(err=>{
    //         return err;
    //     })
    // }

    sharedArticle(id){
        let api =environment.endPoint+"getContent/"+id;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }


    editSectionsPageView(userId,sectionId):Observable<any>{
        let api = environment.endPoint+"editSectionsPageView/"+sectionId
        let body = {
            user_id:userId
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    editCategoryPageView(userId,category_id):Observable<any>{
        let api = environment.endPoint+"editCategoryPageView/"+category_id
        let body = {
            user_id:userId
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    editSubCategoriesPageView(userId,subCategoryId):Observable<any>{
        let api = environment.endPoint+"editSubCategoriesPageView/"+subCategoryId
        let body = {
            user_id:userId
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }


    continueReading(contentId):Observable<any>{
        let api=environment.endPoint+"continueReading/"+contentId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }
    

    savedContributions(userId):Observable<any>{
        let api=environment.endPoint+"savedContributions/"+userId;
        return this.http.get(api)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error;
        })
    }

    // ------------------------------------------------------24/11/2017-------------------------------------

    editCategoryTotalTime(categoryId,time):Observable<any>{
        let api = environment.endPoint+"editCategoryTotalTime/"+categoryId
        let body = {
            totalTime:time
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    editSectionTotalTime(sectionId,time):Observable<any>{
        let api = environment.endPoint+"editSectionTotalTime/"+sectionId
        let body = {
            totalTime:time
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    editSubCategoriesTotalTime(subcategoryId,time):Observable<any>{
        let api = environment.endPoint+"editSubCategoriesTotalTime/"+subcategoryId
        let body = {
            totalTime:time
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    // -----------------------27/11/2017-----------------

    getFriends(friends):Observable<any>{
        let api = environment.endPoint+"getFriends"
        let body = {
            myFriends:friends
        }
        return this.http.post(api,body)
        .map(response=>{
            return response.json();
        }).catch(error=>{
            return error
        })
    }

    getJSON(): Observable<any> {
        console.log("json function")
         return this.http.get('assets/state_district_blocks_maharashtra.json')
         .map((res:any) => {return res.json()})
         .catch(error=> {
             return error
         });
     }
}
