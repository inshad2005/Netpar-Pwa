import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AddArticleModel } from './add-contibution.model';
import { AppProvider } from '../providers/app';
import { DomSanitizer } from '@angular/platform-browser';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css']
})
export class AddContributionComponent implements OnInit {

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userInfo=JSON.parse(localStorage['userInfo']);
    addArticleModel: AddArticleModel = new AddArticleModel ();
    firstName=this.userInfo.firstName;
    lastName=this.userInfo.lastName;
    mobileNumber=this.userInfo.mobileNumber;
    language=localStorage['selectedLanguage']
    sectionData;
    categories;
    subCategories;
    uploadedImage;
    constructor(private domSanitizer:DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
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
      this.subCategories=category.section_subcategories;
    }

    slides = [

        {img: "http://placehold.it/350x150/000000"},

        {img: "http://placehold.it/350x150/111111"},

        {img: "http://placehold.it/350x150/333333"},

        {img: "http://placehold.it/350x150/666666"}

    ];

    slideConfig = {"slidesToShow": 4, "slidesToScroll": 2};

    addSlide() {

        this.slides.push({img: "http://placehold.it/350x150/777777"})

    }

    removeSlide() {
      this.slides.length = this.slides.length - 1;
    }


    onUploadImage(event){
      let tmppath = URL.createObjectURL(event.target.files[0]);
      this.uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
      console.log(tmppath)
    }
    
    safeUrl(url){
      let a=this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    }

    //  onGridVideoData3Change(event: any, right: any){
    //   this.listOne[this.currentIndex].imgurl3=null;
    //   this.listOne[this.currentIndex].audiourl3=null;
    //   let tmppath = URL.createObjectURL(event.target.files[0]);
    //   this.listOne[this.currentIndex].videourl3=tmppath;
    //   this.listOne[this.currentIndex].documenturl3=null;
    //   let files = [].slice.call(event.target.files);
    //   this.newUploadFiles=files;
    //   console.log(this.newUploadFiles[0])
    //   this.length = this.newUploadFiles.length;
    //   this.makeVideoForGrid3File(right);
    //  }

    // makeVideoForGrid3File(right:any) {
    //     for (var i = 0; i < this.length; i++) {
    //         let formData: FormData = new FormData();
    //         console.log(this.newUploadFiles[i])
    //         this.uploadFile = this.newUploadFiles[i];
    //         formData.append('file', this.uploadFile);
    //         // formData.append('tag', right.tag);
    //         // formData.append('count', right.count);
    //         // formData.append('for', 'videourl3');
    //         if (this.gridFileData.map(function (arg) { return arg.count; }).indexOf(right.count)!=-1) {
    //          let index=this.gridFileData.map(function (arg) { return arg.count; }).indexOf(right.count)
    //             this.gridFileData[index].file3=formData
    //             this.gridFileData[index].for3="videourl3"
    //         }else{
    //           this.gridFileData.push({tag:right.tag,count:right.count,for3:"videourl3",file1:null,file2:null,file3:formData})
    //         }
    //     }
    //}
}