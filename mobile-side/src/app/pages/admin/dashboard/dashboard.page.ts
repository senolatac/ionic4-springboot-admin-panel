import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userCount: any = "";
  productCount: any = "";
  transactionCount: any = "";

  constructor(
    private adminService: AdminService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfProducts();
    this.numberOfTransactions();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  numberOfUsers() {
    this.adminService.numberOfUsers().subscribe(data => {
      this.userCount = data.response;
    });
  }

  numberOfProducts() {
    this.adminService.numberOfProducts().subscribe(data => {
      this.productCount = data.response;
    });
  }

  numberOfTransactions() {
    this.adminService.numberOfTransactions().subscribe(data => {
      this.transactionCount = data.response;
    });
  }

}
