import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdProgressBarModule, MdCheckboxModule, MdProgressSpinnerModule, MdSelectModule, MdInputModule, MdRadioModule} from "@angular/material";
import { MdListModule, MdDialogModule } from '@angular/material';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import {  MdTooltipModule, MdTableModule, MdPaginator } from "@angular/material";
import {MdTabsModule} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface}  from 'ngx-perfect-scrollbar';

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


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    MdTableModule,
    MdListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ PopupComponent, SecurityDialogComponent, SecurityDialog2Component  ]

})


export class AppModule { }
