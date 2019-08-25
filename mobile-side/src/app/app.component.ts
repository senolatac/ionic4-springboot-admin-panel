import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {UserService} from './services/user.service';
import {User} from './models/user';
import {Role} from './models/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  currentUser: User = null;
  appPages: Array<{title, url, icon}>;
  isAdmin: Boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeUser();
    });
  }

  logOut() {
    this.userService.logOut().subscribe(data => {
      this.menu.close();
      this.router.navigate(['/login']);
    })
  }

  initializeUser() {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
      this.isAdmin = (this.currentUser && Role.ADMIN === this.currentUser.role);
      this.initializeMenu();
    });
  }

  initializeMenu() {
    if(this.isAdmin === true) {
      this.appPages = [
        {title: 'Dashboard', url: '/dashboard', icon: 'home'},
        {title: 'Users', url: '/users', icon: 'contact'},
        {title: 'Products', url: '/products', icon: 'pricetag'},
        {title: 'Transactions', url: '/transactions', icon: 'logo-usd'},
      ];
    } else {
      //login and register pages will be public page.
      //These will be sidemenu items.
      this.appPages = [
        {title: 'Home', url: '/home', icon: 'home'},
        {title: 'Profile', url: '/profile', icon: 'contact'},
      ];
    }
  }
}
