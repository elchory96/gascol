import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Rx';

@Injectable()

export class GasService {
    constructor(
        public http: Http
    ){}

    public getGas(location){
        let gasolinas = this.http.post('http://www.zona-habitat.com/zh/index.php/GassAll/datosDetalle', { 
            lat: location.lat, 
            lng: location.lng,
            dis: 1 
        }, {}).map(response => {
        return response.json();
        });

       return gasolinas;
    }
}