import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

/**
 * Generated class for the ModalDetailGasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detail-gas',
  templateUrl: 'modal-detail-gas.html',
})
export class ModalDetailGasPage {
  public jsonGas: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public renderer: Renderer,
    public platform: Platform, 
    public viewCtrl: ViewController
  ) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'page-modal-detail-gas', true);
    this.jsonGas = navParams.get('jsonGas');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailGasPage');
  }
  public openMapCoords(lat,long){
    let destination = lat + ',' + long;

    if(this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
    } else {
      let label = encodeURI('My Label');
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

}
