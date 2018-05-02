import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalDetailGasPage } from '../modal-detail-gas/modal-detail-gas'
/**
 * Generated class for the SortPriceGasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sort-price-gas',
  templateUrl: 'sort-price-gas.html',
})
export class SortPriceGasPage {

  public jsonDataPrice: any;
  rootNavCtrl: NavController;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.jsonDataPrice = navParams.get('jsonDataGas');
    this.rootNavCtrl = navParams.get('rootNavCtrl');
  }

  ionViewDidLoad() {
    this.jsonDataPrice = this.jsonDataPrice.slice().sort((a,b) => {
      let nameA=a.label_gas.toLowerCase(), nameB=b.label_gas.toLowerCase()
      return a.price-b.price || nameA < nameB
    });
    console.log(this.jsonDataPrice);
  }

  public viewDetailGas(item){
    let modal = this.modalCtrl.create(ModalDetailGasPage,{
      'jsonGas': item,
    },{showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

}
