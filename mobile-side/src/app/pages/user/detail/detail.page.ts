import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
//We will get router param that comes from home page.
import { ActivatedRoute } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { User } from '../../../models/user';
import { Product } from '../../../models/product';
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  productId: string;
  currentUser: User;
  currentProduct: Product;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private menu: MenuController,
    private toastCtrl: ToastController
  ) {
    this.currentUser = this.userService.currentUserValue;
    this.currentProduct = JSON.parse(localStorage.getItem('currentProduct'));
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      //Why id; because we described it in router like that...
      if (params.has('id')) {
        this.productId = params.get('id');
      }
    });
  }

  ionViewWillEnter() {
    //Detail page will not be sidemenu page. It will be detail page so we will show back button.
    this.menu.enable(false);
  }

  purchaseProduct() {
    if (!this.currentUser) {
      this.presentToast("You should sign in to purchase a product.", false);
      return;
    }
    var transaction = new Transaction();
    transaction.product = this.currentProduct;
    transaction.user = this.currentUser;

    this.userService.purchaseProduct(transaction).subscribe(data => {
      this.presentToast("Enrollment is completed.", true);
    }, err => {
      console.log(err);
      this.presentToast("Unexpected error occurred.", false);
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

}
