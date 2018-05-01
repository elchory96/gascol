import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SuperTabsController, SuperTabs} from 'ionic2-super-tabs'

/**
 * Generated class for the ModalListGasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-list-gas',
  templateUrl: 'modal-list-gas.html',
})
export class ModalListGasPage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  sortPrice: any = 'SortPriceGasPage';
  sortDistance: any = 'SortDistanceGasPage';
  jsonDataGas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    this.jsonDataGas = navParams.get('jsonDataGas');
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
