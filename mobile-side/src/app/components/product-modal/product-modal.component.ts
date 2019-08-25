import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NavParams, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private adminService: AdminService,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    Object.assign(this.product, navParams.get('selectedProduct'));
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  saveProduct() {
    if(!this.product.id){
      this.createProduct();
    }else{
      this.updateProduct();
    }
  }

  createProduct() {
    this.adminService.createProduct(this.product).subscribe(data => {
      this.presentToast('Product is created successfully.', true);
      this.modalCtrl.dismiss({
        'success': true,
        'createdProduct': data
      });
    }, err => {
      this.presentToast('Unexpected error occurred.', false);
    })
  }

  updateProduct() {
    this.adminService.updateProduct(this.product).subscribe(data => {
      this.presentToast('Product is updated successfully.', true);
      this.modalCtrl.dismiss({
        'success': true,
        'editedProduct': data
      });
    }, err => {
      this.presentToast('Unexpected error occurred.', false);
    })
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Are you sure to delete product?',
      buttons: [
        {
          text: 'Sure!',
          handler: () => {
            this.adminService.deleteProduct(this.product).subscribe(() => {
              this.presentToast('Product was deleted successfully', true);
              this.modalCtrl.dismiss({
                'success': true,
                'deleted': true,
                'editedProduct': this.product
              });
            }, err => {
              console.log(err);
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
