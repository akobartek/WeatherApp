import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Weather } from 'src/models/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  cityName: string = null

  public setCity(city: string) {
    if (city) {
      this.cityName = city;
    } else {
      this.cityName = null;
    }
  }
}
