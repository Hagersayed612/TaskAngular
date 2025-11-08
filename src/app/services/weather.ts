import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class Weather {
  private apiUrl = 'http://localhost:4454'; // عنوان السيرفر

  constructor(private http: HttpClient) {}

  // جلب كل المدن
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/forecast`);
  }

  // جلب مدينة معينة بالـ ID
  getCityById(cityId: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/cityForecast/${cityId}`);
  }
}
