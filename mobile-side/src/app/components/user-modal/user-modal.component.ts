import { Component, OnInit } from '@angular/core';
//AlertController: We will show delete confirmation alert box
//ToastController: for success/error message.
import { ModalController, NavParams, AlertController, ToastController } from '@ionic/angular';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  user: User = new User();

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private adminService: AdminService
  ) {
    Object.assign(this.user, this.navParams.get('selectedUser'));
  }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  editUser() {
    this.adminService.updateUser(this.user).subscribe(data => {
      this.presentToast('User is updated successfully.', true);
      this.modalCtrl.dismiss({
        'success': true,
        'editedUser': data
      });
    }, err => {
      if (err.status === 409) {
        this.presentToast('Username should be unique for each user.', false);
      } else {
        this.presentToast('Unexpected error occurred.', false);
      }
    });
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure to delete user?',
      buttons: [
        {
          text: 'Sure!',
          cssClass: 'danger',
          handler: () => {
            this.adminService.deleteUser(this.user).subscribe(() => {
              this.presentToast('User was deleted successfully.', true);
              this.modalCtrl.dismiss({
                'success': true,
                'deleted': true,
                'editedUser': this.user
              });
            }, err => {
              this.presentToast('Unexpected error occurred.', false);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });
    await alert.present();
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

}
