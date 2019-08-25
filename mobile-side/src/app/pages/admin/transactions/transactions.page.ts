import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Transaction } from '../../../models/transaction';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  transactionList: Array<Transaction>;

  constructor(
    private adminService: AdminService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.findAllTransactions();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  findAllTransactions() {
    this.adminService.findAllTransactions().subscribe(data => {
      this.transactionList = data;
    })
  }

}
