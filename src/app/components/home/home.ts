import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Citycard } from '../citycard/citycard';
import { City } from '../../models/city';
import { Weather } from '../../services/weather';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Citycard,FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
 
  cities: City[] = [];
  @Input() unit: '°C' | '°F' = '°C';
  @Input() searchTerm: string = '';
  @Input() selectedDate: string = '';

  constructor(private weatherService: Weather) {
    this.loadCities();
  }

  loadCities() {
    this.weatherService.getAllCities().subscribe({
      next: (data) => this.cities = data,
      error: (err) => console.error(err)
    });
  }

  get filteredCities() {
    return this.cities
      .filter(city =>
        city.city.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .map(city => {
        // فلترة حسب التاريخ إذا محدد
        if (this.selectedDate) {
          return {
            ...city,
            forecast: city.forecast.filter(f => f.date === this.selectedDate)
          };
        }
        return city;
      })
      .filter(city => city.forecast.length > 0); // استبعاد المدن بدون بيانات بعد الفلتر
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }

  onDateChange(date: string) {
    this.selectedDate = date;
  }

  onUnitChange(unit: '°C' | '°F') {
    this.unit = unit;
  }
}
