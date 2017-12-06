import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import  {FormsModule} from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import {TestService} from './test.service'
import {AppProvider} from './providers/app.provider';
import { NotfoundComponent } from './notfound/notfound.component';
import {AuthGuard} from './guard/auth.guard';
import { FourthComponent } from './fourth/fourth.component';
import { AmitPipe } from './amit.pipe'



@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    NotfoundComponent,
    FourthComponent,
    AmitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TestService,AppProvider,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
