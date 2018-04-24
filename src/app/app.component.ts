import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';

import { AccountPage } from '../pages/account/account';
import { OtherPage } from '../pages/other/other';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { UserServiceProvider } from '../providers/user-service';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  logsOut?: boolean;
  index?: number;
}

@Component({
    templateUrl: 'app.html'
})
export class PassportApp {
    @ViewChild(Nav) nav: Nav;

    appPages: PageInterface[] = [
        { title: 'Home', name: 'HomePage', component: HomePage},
        { title: 'Other', name: 'OtherPage', component: OtherPage},
    ];
    loggedInPages: PageInterface[] = [
        { title: 'Account', name: 'AccountPage', component: AccountPage},
        { title: 'Logout', name: 'HomePage', component: HomePage, logsOut: true }
    ];
    loggedOutPages: PageInterface[] = [
        { title: 'Login', name: 'LoginPage', component: LoginPage},
        { title: 'Register', name: 'RegisterPage', component: RegisterPage}
    ];

    rootPage: any = HomePage;

    constructor(
        public events: Events,
        public userService: UserServiceProvider,
        public menu: MenuController,
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen) {

        this.initializeApp();

        // decide which menu items should be hidden by current login status stored in local storage
        this.userService.hasLoggedIn().then((hasLoggedIn) => {
            this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);

        this.listenToLoginEvents();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:signup', () => {
            this.enableMenu(true);
        });

        this.events.subscribe('user:logout', () => {
            this.enableMenu(false);
        });
    }

    enableMenu(loggedIn: boolean) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    }
}