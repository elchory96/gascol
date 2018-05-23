import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';
import { GasService } from '../shared/gas-service';
import { ModalDetailGasPage } from '../pages/modal-detail-gas/modal-detail-gas';
import { ModalListGasPage } from '../pages/modal-list-gas/modal-list-gas';
import { PopoverFilterMapPage } from '../pages/popover-filter-map/popover-filter-map';
import { SuperTabsModule, SuperTabsController } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    ModalDetailGasPage,
    ModalListGasPage,
    PopoverFilterMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atras'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    ModalDetailGasPage,
    ModalListGasPage,
    PopoverFilterMapPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    HttpModule,
    SuperTabsController,
    SplashScreen,
    GasService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
