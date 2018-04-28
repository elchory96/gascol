import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  titlegas: String = "";
  preciogas: String = "";
  horariogas: String = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public renderer: Renderer, 
    public viewCtrl: ViewController
  ) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'page-modal-detail-gas', true);
    this.titlegas = navParams.get('titlegas');
    this.preciogas = navParams.get('preciogas');
    this.horariogas = navParams.get('horariogas');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailGasPage');
  }

}
