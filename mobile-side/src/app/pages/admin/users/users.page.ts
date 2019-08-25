import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MenuController, ModalController } from '@ionic/angular';
import { User } from '../../../models/user';
import { UserModalComponent } from '../../../components/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  userList: Array<User>;

  constructor(
    private adminService: AdminService,
    private menu: MenuController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.findAllUsers();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
    })
  }

  async presentModal(item: User) {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: {
        'selectedUser': item
      }
    });

    modal.onWillDismiss().then((p) => {
      console.log(p);
      //params will be send in data.
      const { editedUser, success, deleted } = p.data;
      console.log(p.data.success);
      if (!success) {
        return;
      }
      let itemIndex = this.userList.findIndex(item => item.id == editedUser.id);
      console.log(itemIndex);
      if (itemIndex === -1) {
        return;
      }
      if (deleted) {
        this.userList.splice(itemIndex, 1);
      } else {
        this.userList[itemIndex] = editedUser;
      }
    });

    return await modal.present();
  }

}
