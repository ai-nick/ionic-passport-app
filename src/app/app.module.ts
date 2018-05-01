import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { PassportApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OtherPage } from '../pages/other/other';

import { AccountPage } from '../pages/account/account';
import { RegisterPage } from '../pages/register/register';

import { LoginPageModule } from '../pages/login/login.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalServiceProvider } from '../providers/global-service';
import { PassportServiceProvider } from '../providers/passport-service';
import { UserServiceProvider } from '../providers/user-service';

@NgModule({
    declarations: [
        PassportApp,
        HomePage,
        ListPage,
        OtherPage,
        AccountPage,
        RegisterPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(PassportApp),
        IonicStorageModule.forRoot({
            name: '__appDB'
        }),
        LoginPageModule,
    ],
    bootstrap: [IonicApp],
        entryComponents: [
        PassportApp,
        HomePage,
        ListPage,
        OtherPage,
        AccountPage,
        RegisterPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GlobalServiceProvider,
        PassportServiceProvider,
        UserServiceProvider,
    ]
})
export class AppModule {}
