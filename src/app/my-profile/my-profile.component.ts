import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AllPostsService } from '../providers/allPost.service';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdateprofileService } from './updateprofile.service';
import { UpdateProfileModel,UpdateMobileModel } from './updateprofile.model.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers:[AllPostsService,UpdateprofileService]
})
export class MyProfileComponent implements OnInit {

   	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userId;
    savedPosts;
    userInfo=JSON.parse(localStorage['userInfo']);
    base64textString;
    editMobileNumber=false;
    editgender=false;
    editAddress=false;
    editDob=false;
    days;
    months;
    years;
    dateValue;
    totalYears=100;
    profilePicture=localStorage['profileImage'];
    updateProfileModel: UpdateProfileModel = new UpdateProfileModel ();
    updateMobileModel:UpdateMobileModel=new UpdateMobileModel ();
    mm;
    month;
    dd;
    yy;
    errorMessage;
    myContributions;
    validationErrorMessage;
    stateData;
    districtData;
    blockData;
    downloadedMedia
    constructor(private dialog: MatDialog,private updateprofileService:UpdateprofileService,private domSanitizer:DomSanitizer,private router:Router,private appProvider:AppProvider,private allPostsService:AllPostsService,location: Location,  private element: ElementRef) {
      this.userId=this.userInfo._id;
    	this.location = location;
      this.sidebarVisible = false;
      this.getSavedPost();
      this.updateProfileModel.state=this.userInfo.stateRegional
      this.updateProfileModel.district=this.userInfo.districtRegional
      this.updateProfileModel.dateOfBirth=this.userInfo.dateOfBirth
      this.updateProfileModel.gender=this.userInfo.gender
      this.updateProfileModel.block=this.userInfo.blockRegional
      this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
      if (localStorage['downloadMedia']) {
        this.downloadedMedia=JSON.parse(localStorage['downloadMedia']);
        console.log(this.downloadedMedia);
      }
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.uploadImage();
      this.savedContributions();
      this.getDays();
      this.getMonths();
      this.getYears();
      this.getStateData();
      if (this.appProvider.current.landingArea) {
        console.log("landingArea")
        document.getElementById("downloadSection").scroll();
      }
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

    // --------------------------------------mukul-----------------------------------

    getSavedPost(){
      this.allPostsService.getSavedPosts(this.userId).subscribe(data=>{
        if (data.success==true) {
          this.savedPosts=data.saved_articles;
        }
      },err=>{

      })
    }

    colorClass(i){
      if (i%7==0) {
        return "color-red";
      }
      else if (i%7==1) {
        return "color-orange";
      }
      else if (i%7==2) {
        return "color-yellow";
      }
       else if (i%7==3) {
        return "color-blue";
      }
       else if (i%7==4) {
        return "color-green";
      }
       else if (i%7==5) {
        return "color-purple";
      }
       else if (i%7==6) {
        return "color-pink";
      }
    }


  onSaved(articleData){
    this.appProvider.current.articleDetails=articleData;
    this.router.navigate(["/article-details"],{skipLocationChange:false});
  }

  selectImage(evt){
      // var files = event.target.files;
      // var file = files[0];
      // if (files && file) {
      //     var reader = new FileReader();

      //     reader.onload =this._handleReaderLoaded.bind(this);

      //     reader.readAsBinaryString(file);
      // }

      if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            this.appProvider.current.profilImagePath = fr.result;
             this.router.navigate(['/crop-image'],{skipLocationChange:false})
        };
        fr.readAsDataURL(file);
  }



  imageUploadForGridOneIndexEvent(evt: any,) {
      if (!evt.target) {
          return;
      }
      if (!evt.target.files) {
          return;
      }
      if (evt.target.files.length !== 1) {
          return;
      }
      const file = evt.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
          return;
      }
      const fr = new FileReader();
      fr.onloadend = (loadEvent) => {
        this.appProvider.current.profilImagePath = fr.result;
      };
      fr.readAsDataURL(file);
   }

 
   uploadImage(){
     if (this.appProvider.current.cropedImage) {
        this.updateprofileService.updateProfilePicture(this.appProvider.current.cropedImage,this.userId).subscribe(response=>{
           console.log(response);
           if (response.success==true) {
             localStorage['profileImage']=response.url;
           }
        })
     }
   }

   edit(field){
     console.log(field)
     if (field=='mobileNumber') {
        this.editMobileNumber=true;
        this.editgender=false
        this.editAddress=false
        this.editDob=false
     }
     if (field=='gender') {
       this.editgender=true
       this.editMobileNumber=false;
       this.editAddress=false
        this.editDob=false
     }
     if (field=='address') {
        this.editAddress=true
        this.editMobileNumber=false;
        this.editgender=false
        this.editDob=false

     }
     if (field=='dob') {
        this.editDob=true
        this.editAddress=false
        this.editMobileNumber=false;
        this.editgender=false
     }
   }

   onSend(field){
       if (field=='mobileNumber'){
        this.editMobileNumber=false;
        this.verifyMobile();
       }
      if (field=='gender'){
         this.editgender=false;
         this.updateProfile();
      }
      if (field=='address'){
        this.editAddress=false
          this.updateProfile();
      }
      if (field=='dob'){
        switch (this.mm) {
            case "Dec":
              this.month='12'
            break;
            case "Nov":
              this.month='11'
            break;
            case "Oct":
              this.month='10'
            break;
            case "Sep":
              this.month='09'
            break;
            case "Aug":
              this.month='08'
            break;
            case "Jul":
              this.month='07'
            break;
            case "Jun":
              this.month='06'
            break;
            case "May":
              this.month='05'
            break;
            case "Apr":
              this.month='04'
            break;
            case "Mar":
              this.month='03'
            break;
            case "Feb":
              this.month='02'
            break;
            case "Jan":
              this.month='01'
            break;
            default:
              break;
          }
        if (!this.dd || !this.mm || !this.yy) {
          this.updateProfileModel.dateOfBirth=this.userInfo.dateOfBirth
        }else{
          this.updateProfileModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
        }

        this.editDob=false
        this.updateProfile();
      }
   }

      // ----------------------------calender------------------
    getDays(){
        this.days = [];
        for(var i=1;i<=31;i++){
              if(i<=9){
                this.dateValue = '0' + i;
              } else {
                 this.dateValue = i;
              }
              this.days.push({value:this.dateValue});
        }
        // alert (JSON.stringify(this.days));
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar" , "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
        // alert(JSON.stringify(this.months))
        return this.months;
    }


    getYears(){
      var currentYear = new Date().getFullYear();
      this.years=[];
      for (var i = currentYear; i > currentYear - this.totalYears; i--) {
          this.years.push({year: [i - 1]});
      }
      return this.years;
    }

    updateProfile(){
      this.updateprofileService.updateProfile(this.updateProfileModel,this.userId).subscribe(response=>{
        console.log(response);
        this.userInfo.blockRegional=this.updateProfileModel.blockRegional
        this.userInfo.districtRegional=this.updateProfileModel.districtRegional
        this.userInfo.stateRegional=this.updateProfileModel.stateRegional
        localStorage['userInfo']=JSON.stringify(response.info);
        this.ngOnInit();
      },error=>{
        console.log(error);
      })
    }

    updateMobileNumber(){
      this.updateMobileModel.mobileNumber=localStorage['mobileNumber']
      this.updateprofileService.updateMobileNumber(this.updateMobileModel).subscribe(data=>{
        console.log(data);
        localStorage['mobileNumber']=this.updateMobileModel.mobileNumberNew;
      },error=>{
        console.log(error);
      })
    }

    verifyMobile(){
      if(this.updateMobileModel.mobileNumberNew.length<10){
         this.validationErrorMessage="incorrect mobile number";
          this.openValidationAlert(this.validationErrorMessage);
          this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
        return
      }else{
        this.updateprofileService.VerifyMobile(this.updateMobileModel.mobileNumberNew).subscribe(data=>{
          if (data.msg=="This mobile number already exists in database!!"){
            this.errorMessage="user already registered";
            this.openDialog(this.errorMessage);
            this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
          }else{
            this.updateMobileNumber();
          }
        },error=>{
          console.log(error);
        })
      }
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

    savedContributions(){
      this.allPostsService.savedContributions(this.userId).subscribe(data=>{
        console.log(data);
        this.myContributions=data.data;
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

    onDownloadApp(){
      console.log('hi')
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

    getStateData(){
      this.allPostsService.getJSON().subscribe(data=>{
         this.stateData=data
      },error=>{
        console.log(error);
      })
    }

    onState(stateData){
      this.updateProfileModel.state=stateData.name;
      this.districtData=stateData.dist;
    }

    onDistrict(district){
      this.updateProfileModel.district=district.name;
      this.blockData=district.block;
    }

    onBlock(block){
      this.updateProfileModel.block=block.name
    }

    onRemoveDownload(index){
      this.downloadedMedia.splice(index,1);
      localStorage['downloadMedia']=JSON.stringify(this.downloadedMedia);
    }

}
