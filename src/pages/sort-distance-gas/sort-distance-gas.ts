import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SortDistanceGasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort-distance-gas',
  templateUrl: 'sort-distance-gas.html',
})
export class SortDistanceGasPage {

  public jsonDataDistance: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jsonDataDistance = navParams.get('jsonDataGas');
  }

  ionViewDidLoad() {
    this.jsonDataDistance = this.jsonDataDistance.slice().sort((a,b) => {
      return a.distanceorigin-b.distanceorigin
    });
    console.log(this.jsonDataDistance);
  }

}
