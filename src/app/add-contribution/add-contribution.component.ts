import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserContibutionModel } from './add-contribution.model.component';
import { AppProvider } from '../providers/app';
import { DomSanitizer } from '@angular/platform-browser';
import { AddContributionService } from './add-contribution.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { PopupComponent } from '../alerts/popup/popup.component';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css'],
  providers:[AddContributionService]
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
    constructor(private dialog: MatDialog,private addContributionService:AddContributionService,private domSanitizer:DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
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
      this.slides.splice(index,1);
      if (this.mediaToUpload) {
        this.mediaToUpload.splice(index,1);
      }
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


}