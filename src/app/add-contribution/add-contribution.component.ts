import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserContibutionModel } from './add-contribution.model.component';
import { AppProvider } from '../providers/app';
import { DomSanitizer } from '@angular/platform-browser';
import { AddContributionService } from './add-contribution.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { PopupComponent } from '../alerts/popup/popup.component';
import { TranslationService } from '../providers/translation.service'

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css'],
  providers:[TranslationService,AddContributionService]
})
export class AddContributionComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userInfo=JSON.parse(localStorage['userInfo']);
    userContibutionModel: UserContibutionModel = new UserContibutionModel ();
    firstName=this.userInfo.firstName;
    lastName=this.userInfo.lastName;
    mobileNumber=this.userInfo.mobileNumber;
    language=localStorage['selectedLanguage']
    sectionData;
    categories;
    subCategories;
    uploadedImage;
    newUploadFiles;
    length;
    uploadFile;
    sectionId;
    mediaToUpload=[];
    slides = [];
    validationErrorMessage;
    currentInputTag
    currentString
    sendString
    outputStringArrayLength
    currentActiveIndex
    inputStringLength
    outputStringLength
    caretPos
    selectedValue:any;
    constructor(private translationService:TranslationService,private elementRefrence:ElementRef,private dialog: MatDialog,private addContributionService:AddContributionService,private domSanitizer:DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
      this.sectionData=this.appProvider.current.sidebarMenuData; 
    }


  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  	}

  	navRemove(){
  		/*alert('home')*/
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  			//localStorage['menuOpen']=='false'
  		}
  	}

    // --------------------------mukul------------------------------------------
    onSection(section){
      console.log(section)
      this.categories=section.section_categories;
    }

    onCategory(category){
      console.log(category)
      this.subCategories=category.section_subcategories;
    }

    onSubcategory(subCategory){
        console.log(subCategory)
        this.userContibutionModel.sectionId=subCategory.sectionId;
        this.userContibutionModel.categoryId=subCategory.categoryId;
        this.userContibutionModel.subCategoryId=subCategory._id;
    }

    slideConfig = {"slidesToShow": 4, "slidesToScroll": 2};

    addSlide(mediaUrl,mediaType) {
      this.slides.push({url: mediaUrl,type:mediaType})
    }

    removeSlide(index) {
      // this.slides.length = this.slides.length - 1;
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:"are you sure you want to remove attached media"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result=='yes') {
          this.slides.splice(index,1);
          if (this.mediaToUpload) {
            this.mediaToUpload.splice(index,1);
          }
        }
      });
      
    }


    onUploadImage(event,type){
      if(type=='image'){
        let tmppath = URL.createObjectURL(event.target.files[0]);
        this.uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
        this.addSlide(this.uploadedImage,type)
      }else if(type=='audio'){
        let url = "./assets/img/volume.png";
        this.addSlide(url,type)
      }else if (type=='video') {
        let tmppath = URL.createObjectURL(event.target.files[0]);
        this.uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
        this.addSlide(this.uploadedImage,type)
      }else if (type=='doc') {
        let url ="./assets/img/document.png";
        this.addSlide(url,type)
      }
      let files = [].slice.call(event.target.files);
      this.newUploadFiles=files;
      console.log(this.newUploadFiles[0])
      this.length = this.newUploadFiles.length;
      this.onUploadImg(type)
    }
    
    safeUrl(url){
      let a=this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    }


    onUploadImg(type){
      for (var i = 0; i < this.length; i++) {
          let formData: FormData = new FormData();
          console.log(this.newUploadFiles[i])
          this.uploadFile = this.newUploadFiles[i];
          formData.append('photos', this.uploadFile);
          this.addContributionService.uploadMedia(formData,type).subscribe(response=>{
            console.log(response);
            if(response.success==true){
                 this.mediaToUpload.push({url:response.filepath});
                 this.userContibutionModel.media=this.mediaToUpload;
            }
          },error=>{
            console.log(error);
          })
      }
    }

     onPost(){
       let validate = {
          section:this.userContibutionModel.sectionName,
          category:this.userContibutionModel.categoryName,
          subcategory:this.userContibutionModel.subCategoryName,
          language:this.userContibutionModel.language,
          title:this.userContibutionModel.title,
          description:this.userContibutionModel.description,
        }
        if(!validate.section){
          this.validationErrorMessage="section missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.category) {
          this.validationErrorMessage="category missing";
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.subcategory) {
          this.validationErrorMessage="subcategory missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.language) {
          this.validationErrorMessage="language missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.title) {
          this.validationErrorMessage="title missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.description) {
          this.validationErrorMessage="description missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }
        this.userContibutionModel.userId=this.userInfo._id;
        this.userContibutionModel.userName=this.firstName+" "+this.lastName;
        this.userContibutionModel.mobile=this.mobileNumber;
        this.userContibutionModel.dateOfCreation=new Date();
        this.userContibutionModel.userImage=localStorage['profileImage'];
        this.uploadContribution();
     }

     uploadContribution(){
       this.addContributionService.uploadContribution(this.userContibutionModel).subscribe(result=>{
         this.openDialog('contribution submitted successfully');
         this.resetForm();
       },error=>{
          console.log(error);
       })
     }

     openValidationAlert(msg){
      let dialogRef = this.dialog.open(ValidationBoxesComponent, {
          width: '260px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    openDialog(msg): void {
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         
        }
      });
    }

    resetForm(){
      this.userContibutionModel.title='';
      this.userContibutionModel.sectionName='';
      this.userContibutionModel.categoryName='';
      this.userContibutionModel.subCategoryName='';
      this.userContibutionModel.description='';
      this.userContibutionModel.media='';
      this.userContibutionModel.language='';
      this.slides=[]
    }

  onTransliteration(value,event,tag){
   var myEl=event.target
   this.currentInputTag=tag
   this.elementRefrence=event
   let post =this.getCaretPos(event)
   this.currentString=value
   let subValue=value.substring(0, post)
   let localValue=subValue.split(' ')
   let length=localValue.length
   let letstring=localValue[length-1]
   let replcedstring=letstring.match(/[a-zA-Z]+/g);
   let stringForSend
   if (replcedstring) {
     stringForSend=replcedstring[0]
   }
   if (!stringForSend) {
   return 
   }
   else if(stringForSend=='') {
       return 
     }
   else if (/^[a-zA-Z]+$/.test(stringForSend)) {
    this.sendString=stringForSend.toString()
    this.translationService.onGetSuggetiion(stringForSend)
        .subscribe(data => {     
            this.appProvider.current.suggestedString=data
            this.outputStringArrayLength=this.appProvider.current.suggestedString.length
            this.currentActiveIndex=-1;
            this.inputStringLength=this.sendString.length
          },error=>{       
     })
   }
  }

 selectString(state){
   this.currentString=this.currentString.toString()
   this.outputStringLength=state.length
   let replaceWith=state+' '
   let output=this.currentString.replace(this.sendString ,replaceWith)
   if ( this.currentInputTag=='title') {
     this.userContibutionModel.title=output
   }else if(this.currentInputTag=='description'){
     this.userContibutionModel.description=output
   }
   //this.addCategoryRequest.categoryName=output
   let sumIndex=(this.caretPos+this.outputStringLength)-this.inputStringLength
   this.appProvider.current.suggestedString=[]
 }

  onKeyUp(event){
    console.log(event.keyCode )
    if(event.keyCode==32){
      this.currentString=this.currentString.toString()
      if (this.appProvider.current.suggestedString.length>0) {
          if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
           let replaceWith=this.appProvider.current.suggestedString[0]
           let output=this.currentString.replace(this.sendString ,replaceWith)
               if ( this.currentInputTag=='title') {
                 this.userContibutionModel.title=output
               }else if(this.currentInputTag=='description'){
                 this.userContibutionModel.description=output
               }
            this.appProvider.current.suggestedString=[]
          }else{
           let replaceWith=this.appProvider.current.suggestedString[this.currentActiveIndex]
           let output=this.currentString.replace(this.sendString ,replaceWith)
           if ( this.currentInputTag=='title') {
              this.userContibutionModel.title=output
           }else if(this.currentInputTag=='desciprtion'){
             this.userContibutionModel.description=output
           }
          //this.addCategoryRequest.categoryName=output
           this.appProvider.current.suggestedString=[]
          }
      }
    }else if (this.selectedValue && event.keyCode==13) {
     this.currentString=this.currentString.toString()
     if (this.outputStringArrayLength>0) {
          let replaceWith=this.selectedValue+' '
          let output=this.currentString.replace(this.sendString ,replaceWith)
          if ( this.currentInputTag=='title') {
             this.userContibutionModel.title=output
           }else if(this.currentInputTag=='desciprtion'){
             this.userContibutionModel.description=output
           }
          //this.addCategoryRequest.categoryName=output
          this.appProvider.current.suggestedString=[]
      }
    }else if (event.keyCode==38) {
       if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
         this.currentActiveIndex=this.outputStringArrayLength-1
       }else{
         this.currentActiveIndex=this.currentActiveIndex-1
       }
    }else if (event.keyCode==40) {
       if (this.currentActiveIndex==this.currentActiveIndex-1) {
         this.currentActiveIndex=0
       }else{
         this.currentActiveIndex=this.currentActiveIndex+1
       }
    }
  }

  onSuugestionkeyup(state){
    this.selectedValue=state
  }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
      return this.caretPos
    }
  }

  clearSuggstion(){
    this.appProvider.current.suggestedString=[]
  }


}