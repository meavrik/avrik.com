import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';


const API_KEY = 'c40bca616371f16e66b86ec59abd7df1';

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c40bca616371f16e66b86ec59abd7df1
const URL = 'api.openweathermap.org/data/2.5/forecast';

@Injectable({
  providedIn: 'root'
})
export class SpaService {

  constructor(private http: HttpClient) {

  }

  getWeather(city: string = 'London,uk') {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' });
    const options = { headers: headers };

    /* this.http.get<any>(`https://${URL}?q=${city}&appid=${API_KEY}`, options).subscribe(data => {
      console.log(data);

    }, error => {
      console.log('error ' + error);
    }); */
    const url = `http://${URL}?q=${city}&APPID=${API_KEY}`;
    return this.http.get<any>(url);
  }
}
