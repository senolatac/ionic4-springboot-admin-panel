import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
//Navigation to detail page
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productList: Array<Product>;

  constructor(
    private userService: UserService,
    private router: Router,
    private menu: MenuController
  ) { }

  //This function will be called in first initialization(not return back operatiobns...).
  ngOnInit() {
    this.findAllProducts();
  }

  //This function will be called everytime, when page is viewed.
  ionViewWillEnter() {
    this.menu.enable(true);
  }

  findAllProducts() {
    this.userService.findAllProducts().subscribe(data => {
      this.productList = data;
    });
  }

  detail(product: Product) {
    localStorage.setItem("currentProduct", JSON.stringify(product));
    this.router.navigate(['/detail', product.id]);
  }

}
