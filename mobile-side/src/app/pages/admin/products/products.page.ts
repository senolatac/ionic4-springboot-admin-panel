import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Product } from '../../../models/product';
import { ProductModalComponent } from '../../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  productList: Array<Product>;

  constructor(
    private adminService: AdminService,
    private menu: MenuController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.findAllProducts();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  findAllProducts() {
    this.adminService.findAllProducts().subscribe(data => {
      this.productList = data;
    })
  }

  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps: {
        'selectedProduct': (item ? item : new Product())
      }
    });

    modal.onWillDismiss().then((params) => {
      this.saveProduct(params);
    });
    return await modal.present();
  }

  saveProduct(params) {
    const { createdProduct, editedProduct, success, deleted } = params.data;
    if (success !== true) {
      return;
    }
    if (createdProduct) {
      this.productList.push(createdProduct);
      return;
    } 
    let itemIndex = this.productList.findIndex(item => item.id == editedProduct.id);
    if(itemIndex === -1) {
      return;
    }
    if (deleted === true) {
      this.productList.splice(itemIndex, 1);
    } else {
      this.productList[itemIndex] = editedProduct;
    }
  }

}
