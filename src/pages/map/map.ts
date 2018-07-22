import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ModalController, 
  MenuController,
  LoadingController,
  PopoverController,
  AlertController,
  Events
} from 'ionic-angular';
import { GasService } from '../../shared/gas-service';
import { ModalDetailGasPage } from '../modal-detail-gas/modal-detail-gas'
import { ModalListGasPage } from '../modal-list-gas/modal-list-gas';
import { PopoverFilterMapPage } from '../popover-filter-map/popover-filter-map';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  MarkerLabel,
  MarkerClusterIcon,
  MarkerClusterOptions,
  MarkerCluster,
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
  jsonDataGas: any;
  distance: number = 1;
  circlePrimary: any;
  @ViewChild('canvas') canvasEl : ElementRef;

  constructor(
    private navCtrl: NavController,
    public gaserv: GasService,
    public modalCtrl: ModalController, 
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    public events: Events,
    private locationAccuracy: LocationAccuracy,
    public alertCtrl: AlertController,
    public zone: NgZone
  ) {
    this.menuCtrl.enable(true, 'myMenu');
    events.subscribe('map:filter', (distancerange) => {
      this.distance = distancerange;
      this.filterMapLoad();
    });
    // let modal = this.modalCtrl.create(ModalDetailGasPage,{
    //   'titlegas': 'Titulo',
    //   'preciogas': '8.900',
    //   'horariogas': 'Lunes a viernes de 5 am a 9 pm',
    // },{showBackdrop:true, enableBackdropDismiss:true});
    // modal.present();
  }

  ionViewDidLoad(){
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Aquiii eNTRO ACCURANCY');
            this.loadMap();
          },
          error => {
            let alert = this.alertCtrl.create({
              title: 'Ups!',
              subTitle: 'Necesitamos que actives el gps para que funcione correctamente la aplicacion!',
              buttons: ['Aceptar']
            });
            alert.present();
          }
        );
      }else{
        this.loadMap();
      }
    
    });
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      controls: {
        compass: false,
        myLocation: false,
        myLocationButton: false,
        mapToolbar: false
      },
      preferences: {    
        padding: {
          top: 70,
          left: 30,
          right: 30,
          bottom: 40
        },
    
        building: true
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.zone.run(() => {
        this.getPosition();
      });
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
          'radius': parseInt(this.distance + '000'),
          'strokeColor': '#FFFFFF',
          'strokeWidth': 1,
          'fillColor': '#C6DBFF',
          'fillOpacity': 0.35,
        }
        this.map.addCircle(circleopt).then((circle: Circle) => {
          this.circlePrimary = circle;
          let zoom;
          if (this.distance == 1) {
              zoom = 14;
          }else if(this.distance == 2){
              zoom = 13;
          }else if(this.distance == 3){
              zoom = 13;
          }else if(this.distance == 4){
              zoom = 12;
          }else if(this.distance == 5){
              zoom = 12;
          }
          this.map.moveCamera({
            target: response.latLng,
            zoom: zoom,
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
    let gas = this.gaserv.getGas(this.positionCurrent,this.distance);
    let thisclas = this;
    gas.subscribe((data)=>{
      this.jsonDataGas = data;
      this.markers = [];
      let canvas = this.canvasEl.nativeElement;
      let img = new Image();
      img.src='assets/imgs/image.png';
      img.addEventListener("load", function() {
          canvas.width = img.width
          canvas.height = img.height
          thisclas.drawMarkersMap(data,0,data.length,img,canvas);                        
      }, false);
    },()=>{
      
    });
  }

  public drawMarkersMap(json,item,total,img,canvas){
    let totalCont = total - 1;
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.font = '55px Arial';
        ctx.fillStyle = 'white';
        ctx.drawImage(img, 0, 0);
        ctx.fillText('$ ' + json[item].vlr_dtg, 10, 120);
    }
    let markerUrl = canvas.toDataURL();
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
      'jsonGas': json[item],
      'disableAutoPan': false,
      'lat': parseFloat(json[item].latitud_gas),
      'lng': parseFloat(json[item].longitud_gas)
    }
    this.markers.push(marker);
    // this.map.addMarker(marker).then((marker: Marker) => {
    //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //     let modal = this.modalCtrl.create(ModalDetailGasPage,{
    //       'jsonGas': marker.get('jsonGas')
    //     },{showBackdrop:true, enableBackdropDismiss:true});
    //     modal.present();
    //   });
    // });
    // this.markers.push(marker);
    if (totalCont == item) {
      let labelOptions: MarkerLabel = {
        bold: true,
        fontSize: 15,
        color: "white",
        italic: true
      };
      let clusterIcons: MarkerClusterIcon[] = [
          {min: 2, max: 100, url: "./assets/imgs/m1.png", anchor: {x: 16, y: 16}, label: labelOptions},
          {min: 100, max: 1000, url: "./assets/imgs/m2.png", anchor: {x: 16, y: 16}, label: labelOptions},
          {min: 1000, max: 2000, url: "./assets/imgs/m3.png", anchor: {x: 24, y: 24}, label: labelOptions},
          {min: 2000, url: "./assets/imgs/m4.png",anchor: {x: 32,y: 32}, label: labelOptions}
      ];
      
      let options: MarkerClusterOptions = {
        markers: this.markers,
        icons: clusterIcons,
        boundsDraw: false,
        maxZoomLevel: 18
      };
      this.map.addMarkerCluster(options).then((markerCluster: MarkerCluster) => {
        markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
          let marker = params[1];
          let modal = this.modalCtrl.create(ModalDetailGasPage,{
            'jsonGas': marker.get('jsonGas')
          },{showBackdrop:true, enableBackdropDismiss:true});
          modal.present();
        });      
      });
      this.loadingMapa.dismiss();
    }else{
      item = item + 1;
      this.drawMarkersMap(json,item,json.length,img,canvas);
    }
  }
  public verListadoGas(){
    this.navCtrl.push(ModalListGasPage,{jsonDataGas: this.jsonDataGas});
  }
  public presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverFilterMapPage, {
      distance: this.distance
    });

    popover.present({
      ev: ev
    });
  }
  filterMapLoad(){
    this.map.clear();
    this.getPosition();
  }

}
