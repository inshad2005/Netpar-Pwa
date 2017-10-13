import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressBarModule, MdCheckboxModule, MdProgressSpinnerModule, MdSelectModule, MdInputModule, MdRadioModule} from "@angular/material";
import { MdListModule, MdDialogModule } from '@angular/material';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule,MdExpansionModule} from '@angular/material';
import {  MdTooltipModule, MdTableModule, MdPaginator } from "@angular/material";
import { MdTabsModule} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface}  from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http, JsonpModule } from "@angular/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SlickModule } from 'ngx-slick';


import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { PopupComponent } from './otp/popup/popup.component';
import { SecurityDialogComponent } from './otp/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from './otp/security-dialog2/security-dialog2.component';
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
import { Popup2Component } from './otp/popup2/popup2.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdInputModule,
    MdRadioModule,
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdTooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    MdTableModule,
    MdListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MdExpansionModule,
    SlickModule.forRoot(),
  ],
  providers: [AppProvider],
  bootstrap: [AppComponent],
  entryComponents: [ Popup2Component,PopupComponent, SecurityDialogComponent, SecurityDialog2Component, StateDialogComponent, LanguageDialogComponent  ]

})


export class AppModule { }
