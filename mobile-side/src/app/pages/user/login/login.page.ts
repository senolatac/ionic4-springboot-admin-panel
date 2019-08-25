import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
//Router: Navigate it after successfull login operation.
import { Router } from '@angular/router';
//MenuController: Sidemenu open/close, enable/disable operations.
//LoadingController: Loading bar for waiting operations.
//ToastController: Message box for success/error messages...
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loader: any;
  user: User = new User();
  isDismiss = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    //Disable sidemenu on login page.
    this.menu.enable(false);
    //If user is exist, redirect it to home page.
    this.redirectPage(this.userService.currentUserValue);
  }

  login() {
    this.presentLoading();
    this.userService.login(this.user).subscribe(data => {
      this.presentToast("Login operation is completed.", true);
      //Wait 1 second, then redirect it to home page.
      setTimeout(() => {
        this.dismiss();
        this.redirectPage(data);
      }, 1000);
    }, err => {
      this.presentToast("Username or password is incorrect", false);
      this.dismiss();
    });
  }

  async presentToast(msg, success) {
    const toast = await this.toastCtrl.create({
      message: msg,
      //Colors can be found from theme/variables.scss
      color: (success ? 'success' : 'danger'),
      duration: 3000,
      showCloseButton: true,
    });
    toast.present();
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present().then(() => {
      //Dismiss can be called before present because it is async. If already dismiss called, then don't show it.
      if (this.isDismiss) {
        this.loader.dismiss();
      }
    });
  }

  async dismiss() {
    this.isDismiss = true;
    if (!this.loader) {
      return;
    }
    return await this.loader.dismiss();
  }

  redirectPage(user) {
    if (!user) {
      return;
    }
    if (Role.ADMIN === user.role) {
      //Main page of admin will be dashboard.
      this.router.navigate(['/dashboard']);
    } else {
      //Main page of user will be home.
      this.router.navigate(['/home']);
    }
  }

}
