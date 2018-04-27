import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';
import { GasService } from '../shared/gas-service'

@NgModule({
  declarations: [
    MyApp,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    HttpModule,
    SplashScreen,
    GasService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
