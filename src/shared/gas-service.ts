import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {Observable} from 'rxjs/Rx';

@Injectable()

export class GasService {
    constructor(
        public http: Http
    ){}

    public getGas(location){
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let gasolinas = this.http.post(
            'http://www.zona-habitat.com/zh/index.php/GassAll/datosDetalle',
            'lat=' + location.lat + '&lng=' + location.lng + '&dis=' + 5, 
            options
        ).map(response => {
            return response.json();
        });

       return gasolinas;
    }
}