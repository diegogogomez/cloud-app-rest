import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private http: HttpClient ){
    console.log('Listado de paises');
    this.http.get('https://restcountries.eu/rest/v2/capital/bogota')
    .subscribe( capital => {
      console.log(capital);
    });
  }
  title = 'cloud-app-rest';
}
