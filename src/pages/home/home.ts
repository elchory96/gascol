import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { MapPage } from '../map/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registerCredentials = { email: '', password: '' };
  
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'myMenu');
  }

  login() {
    this.navCtrl.setRoot(MapPage);
  }

}
