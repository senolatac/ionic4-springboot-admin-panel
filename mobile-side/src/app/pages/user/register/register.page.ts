import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
//We will navigate it to login page after register.
import { Router } from '@angular/router';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
    this.menu.enable(false);
  }

  register() {
    this.presentLoading();
    this.userService.register(this.user).subscribe(data => {
      this.presentToast("Register operation is completed successfully.", true);
      //Wait 1 second, then redirect it to home page.
      setTimeout(() => {
        this.dismiss();
        this.router.navigate(['/login']);
      }, 1000);
    }, err => {
      if (err && err.status === 409) {
        this.presentToast("Username is not valid.", false);
      } else {
        console.log(err);
        this.presentToast("Unexpected error occurred.", false);
      }
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

}
