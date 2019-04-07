import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Weather } from 'src/models/weather';

@Component({
  selector: 'app-city',
  templateUrl: 'city.component.html',
  styleUrls: ['city.component.css']
})
export class CityComponent {

  @Input() city: string;

  constructor(private http: HttpClient) {
    if (this.city == null) {
      this.getLocation();
    } else {
      this.getWeather();
    }
  }

  currentLocation: Coordinates;
  weather: Weather = new Weather();
  url: string = 'http://api.openweathermap.org/data/2.5/weather';

  ceil(temp: number): number {
    return Math.ceil(temp);
  }
  public getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = position.coords;
          console.log(this.currentLocation);
          this.getWeather();
        },
        (failure) => {
          console.log(failure);
        }
      );
    }

  }
  getWeather() {
    this.weather = new Weather();
    let params: HttpParams;
    if (this.city == null) {
      params = new HttpParams()
        .append('lat', this.currentLocation.latitude.toString())
        .append('lon', '' + this.currentLocation.longitude)
        .append('appid', 'dd4f5208462a65c91cde34a69c850673');
    } else {
      params = new HttpParams()
        .append('q', this.city)
        .append('appid', 'dd4f5208462a65c91cde34a69c850673');
    }

    this.http.get<string>(this.url, {
      params
    }
    ).subscribe((result: any) => {
      console.log(result)
      this.weather.city = result.name;
      this.weather.pressure = result.main.pressure;
      this.weather.sunrise = result.sys.sunrise;
      this.weather.sunset = result.sys.sunset;
      this.weather.temperature = result.main.temp;
      this.weather.temperatureMax = result.main.temp_max;
      this.weather.temperatureMin = result.main.temp_min;
      this.weather.visibility = result.visibility;
      this.weather.wind = result.wind.speed;
      this.weather.humidity = result.main.humidity;
      result.weather.forEach(element => {
        this.weather.icons.push({
          description: element.description, url: `http://openweathermap.org/img/w/${element.icon}.png`
        })
      });

    }, (error: any) => {
      console.log(error);
    })
  }
}


