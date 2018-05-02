import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PopoverFilterMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-filter-map',
  templateUrl: 'popover-filter-map.html',
})
export class PopoverFilterMapPage {

  distanceRange: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.distanceRange = navParams.get('distance');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverFilterMapPage');
  }
  public filterbtn(){
    this.events.publish('map:filter', this.distanceRange);
  }

}
