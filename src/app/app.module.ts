import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule,MatProgressBarModule, MatCheckboxModule, MatProgressSpinnerModule, MatSelectModule, MatInputModule, MatRadioModule} from "@angular/material";
import { MatAutocompleteModule,MatListModule, MatDialogModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule,MatExpansionModule} from '@angular/material';
import { MatTooltipModule, MatTableModule, MatPaginator } from "@angular/material";
import { MatTabsModule} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface}  from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http, JsonpModule } from "@angular/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SlickModule } from 'ngx-slick';
import { CeiboShare } from 'ng2-social-share';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { PopupComponent } from './alerts/popup/popup.component';
import { SecurityDialogComponent } from './alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from './alerts/security-dialog2/security-dialog2.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { Homepage3Component } from './homepage3/homepage3.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { WelcomeScreen2Component } from './welcome-screen2/welcome-screen2.component';
import { StateDialogComponent } from './welcome-screen2/state-dialog/state-dialog.component';
import { LanguageDialogComponent } from './welcome-screen2/language-dialog/language-dialog.component';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { AppProvider } from './providers/app';
import { Popup2Component } from './alerts/popup2/popup2.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { ListingView3Component } from './listing-view3/listing-view3.component';
import { ListingView6Component } from './listing-view6/listing-view6.component';
import { ListingView5Component } from './listing-view5/listing-view5.component';
import { ListingView7Component } from './listing-view7/listing-view7.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ListingView8Component } from './listing-view8/listing-view8.component';
import { FriendsComponent } from './friends/friends.component';
import { MyContributionComponent } from './my-contribution/my-contribution.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FilterComponent } from './filter/filter.component';
import { RegisterationStepOneComponent } from './registeration-step-one/registeration-step-one.component';
import { ValidationBoxesComponent } from './alerts/validation-boxes/validation-boxes.component';
import { RevupDirective } from './directives/revup.directive';
// import { CommentsComponent } from './article-details/comments/comments.component';
import {CommentsComponent} from './comments/comments.component'

import { BackButtonNavbarComponent } from './components/back-button-navbar/back-button-navbar.component'
import { FacebookModule } from 'ngx-facebook';
import { ExistingUserCheckComponent } from './alerts/existing-user-check/existing-user-check.component';
import { ListingView2Component } from './listing-view2/listing-view2.component';
import { RecheckDetailsComponent } from './alerts/recheck-details/recheck-details.component';
import { IsThisYouComponent } from './alerts/is-this-you/is-this-you.component';
import { UpdateMobileNumberComponent } from './alerts/update-mobile-number/update-mobile-number.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { AddContributionComponent } from './add-contribution/add-contribution.component';
import { ShareArticleComponent } from './share-article/share-article.component';
import { CropImageComponent } from './crop-image/crop-image.component';
import { NgxCroppieModule } from 'ngx-croppie';


import {AuthGuard} from './security/auth.guard'
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OtpComponent,
    PopupComponent,
    SecurityDialogComponent,
    SecurityDialog2Component,
    HomepageComponent,
    Homepage2Component,
    ArticleDetailsComponent,
    Homepage3Component,
    WelcomeScreenComponent,
    WelcomeScreen2Component,
    StateDialogComponent,
    LanguageDialogComponent,
    Navbar2Component,
    Popup2Component,
    ListingViewComponent,
    ListingView3Component,
    ListingView6Component,
    ListingView5Component,
    ListingView7Component,
    CategoryViewComponent,
    ListingView8Component,
    FriendsComponent,
    MyContributionComponent,
    MyProfileComponent,
    FilterComponent,
    RegisterationStepOneComponent,
    ValidationBoxesComponent,
    RevupDirective,
    CommentsComponent,
    BackButtonNavbarComponent,
    ExistingUserCheckComponent,
    ListingView2Component,
    RecheckDetailsComponent,
    IsThisYouComponent,
    UpdateMobileNumberComponent,
    AddContributionComponent,
    ShareArticleComponent,
    CropImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([],{ useHash: true }),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    MatTableModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MatExpansionModule,
    FacebookModule,
    SlickModule.forRoot(),
    ToastModule.forRoot(),
    NgxCroppieModule
  ],
  providers: [AppProvider,{provide: LocationStrategy, useClass: HashLocationStrategy},AuthGuard],

  bootstrap: [AppComponent],
  entryComponents: [ 
    IsThisYouComponent,
    RecheckDetailsComponent,
    ExistingUserCheckComponent,
    ValidationBoxesComponent,
    Popup2Component,
    PopupComponent, 
    SecurityDialogComponent,
    SecurityDialog2Component,
    StateDialogComponent, 
    LanguageDialogComponent,
    UpdateMobileNumberComponent
  ]

})


export class AppModule { }
