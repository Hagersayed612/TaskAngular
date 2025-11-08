import { Component, Input } from '@angular/core';
import { City } from '../../models/city';
import { Forecast } from '../../models/forecast';

@Component({
  selector: 'app-citycard',
  imports: [],
  templateUrl: './citycard.html',
  styleUrl: './citycard.css',
})
export class Citycard {
  @Input() city!: City;
  @Input() unit: '°C' | '°F' = '°C';
get latestForecast(): Forecast | null {
  if (this.city.forecast && this.city.forecast.length > 0) {
    return this.city.forecast[this.city.forecast.length - 1];
  }
  return null;
}

}
