import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalDetailGasPage } from '../modal-detail-gas/modal-detail-gas';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.jsonDataDistance = navParams.get('jsonDataGas');
  }

  ionViewDidLoad() {
    this.jsonDataDistance = this.jsonDataDistance.slice().sort((a,b) => {
      return a.distanceorigin-b.distanceorigin
    });
    console.log(this.jsonDataDistance);
  }

  public viewDetailGas(item){
    let modal = this.modalCtrl.create(ModalDetailGasPage,{
      'jsonGas': item,
    },{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

}
