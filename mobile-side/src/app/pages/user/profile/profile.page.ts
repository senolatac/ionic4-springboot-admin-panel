import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
//Navigate it after logout...
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

  logOut() {
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }

}
