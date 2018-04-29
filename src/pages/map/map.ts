import { Component, ElementRef, ViewChild } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ModalController, 
  MenuController,
  LoadingController 
} from 'ionic-angular';
import { GasService } from '../../shared/gas-service';
import { ModalDetailGasPage } from '../modal-detail-gas/modal-detail-gas'
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  CircleOptions,
  Circle
} from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;
  positionCurrent: any;
  markers: any[];
  loadingMapa: any;
  @ViewChild('canvas') canvasEl : ElementRef;

  constructor(
    private navCtrl: NavController,
    public gaserv: GasService,
    public modalCtrl: ModalController, 
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController
  ) {
    this.menuCtrl.enable(true, 'myMenu');
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      controls: {
        compass: false,
        myLocation: false,
        myLocationButton: false,
        mapToolbar: false
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.positionCurrent = {
        lat: response.latLng.lat,
        lng: response.latLng.lng
      }
      this.map.addMarker({
        icon: {
          url: 'https://cdn0.iconfinder.com/data/icons/user-icons-4/100/user-17-512.png',
      
          size: {
            width: 60,
            height: 60
          }
        },
        disableAutoPan: true,
        animation: 'DROP',
        position: response.latLng
      }).then((marker: Marker) => {
        let circleopt: CircleOptions = {
          'center': response.latLng,
          'radius': 5000,
          'strokeColor': '#FFFFFF',
          'strokeWidth': 1,
          'fillColor': '#C6DBFF',
          'fillOpacity': 0.35,
        }
        this.map.addCircle(circleopt).then((circle: Circle) => {
          this.map.moveCamera({
            target: response.latLng,
            zoom: 11,
            duration: 2000,
            tilt: 0
          }).then(() => {
            this.loadingMapa = this.loadingCtrl.create({
              content: 'Cargando Mapa...'
            });
            this.loadingMapa.present();
            this.loadGasMap()
          });
        })
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

  public loadGasMap(){
    let gas = this.gaserv.getGas(this.positionCurrent);
    let thisclas = this;
    gas.subscribe((data)=>{
      this.markers = [];
      let canvas = this.canvasEl.nativeElement;
      let img = new Image();
      img.src='assets/imgs/image.png';
      img.addEventListener("load", function() {
          canvas.width = img.width
          canvas.height = img.height
          thisclas.drawMarkersMap(data,0,data.length,img,canvas);                        
      }, false);
    },()=>{});
  }

  public drawMarkersMap(json,item,total,img,canvas){
    let totalCont = total - 1;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.font = '55px Arial';
        ctx.fillStyle = 'white';
        ctx.drawImage(img, 0, 0);
        ctx.fillText('$ ' + json[item].vlr_dtg, 10, 120); // Esto añade el texto '1.5' en la
                                     // posición x: 50, y: 50 de la imagen.
    }
    let markerUrl = canvas.toDataURL();
    // let htmlContent = '<div class="infowindow">\
    //                       <div class="title">\
    //                         <p class=""><i class="material-icons">local_offer</i> '+json[item].label_gas+'</p>\
    //                       </div>\
    //                       <div class="info">\
    //                         <p class=""><i class="material-icons">event</i> '+json[item].info_gas+'</p>\
    //                         <p class=""><i class="material-icons">location_on</i> '+json[item].direccion_gas+'</p>\
    //                         <p class=""><i class="material-icons">attach_money</i> '+json[item].vlr_dtg+'</p>\
    //                         <p class=""><i class="material-icons">local_gas_station</i> '+json[item].desc_param+'</p>\
    //                       </div>\
    //                     </div>';
    let marker = {
      'position': {
          'lat': parseFloat(json[item].latitud_gas),
          'lng': parseFloat(json[item].longitud_gas)
      },
      'icon': {
          url: markerUrl,
          size: {
              width: 40,
              height: 60
          }
      },
      'titlegas': json[item].label_gas,
      'preciogas': json[item].vlr_dtg,
      'horariogas': json[item].info_gas,
      'disableAutoPan': true,
      'lat': parseFloat(json[item].latitud_gas),
      'lng': parseFloat(json[item].longitud_gas)
    }
    this.map.addMarker(marker).then((marker: Marker) => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        let modal = this.modalCtrl.create(ModalDetailGasPage,{
          'titlegas': marker.get('titlegas'),
          'preciogas': marker.get('preciogas'),
          'horariogas': marker.get('horariogas'),
        },{showBackdrop:true, enableBackdropDismiss:true});
        modal.present();
      });
    });
    // this.markers.push(marker);
    if (totalCont == item) {
      this.loadingMapa.dismiss();
    }else{
      item = item + 1;
      this.drawMarkersMap(json,item,json.length,img,canvas);
    }
  }

}
