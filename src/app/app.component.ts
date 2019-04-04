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
  constructor(private http: HttpClient) { }

  currentLocation: Coordinates;
  weather: Weather = new Weather();
  url: string = 'http://api.openweathermap.org/data/2.5/weather';


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
    const params = new HttpParams()
      .append('lat', this.currentLocation.latitude.toString())
      .append('lon', '' + this.currentLocation.longitude)
      .append('appid', 'dd4f5208462a65c91cde34a69c850673');
    this.http.get<string>(this.url, {
      params
    }
    ).subscribe((result: any) => {
      console.log(result)
      this.weather.city = result.name;
      this.weather.pressure = result.main.pressure;
      this.weather.sunrise = result.sys.sunrise;
      this.weather.temperature = result.main.temp;
      this.weather.temperatureMax = result.main.temp_max;
      this.weather.temperatureMin = result.main.temp_min;
      this.weather.visibility = result.visibility;
      this.weather.wind = result.wind.speed;

    })
  }
}

