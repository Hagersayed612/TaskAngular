import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./components/nav/nav";
import { Footer } from "./components/footer/footer";
import { Search } from "./components/search/search";
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav, Footer, Search, Home],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  unit: '°C' | '°F' = '°C';
  searchTerm: string = '';
  selectedDate: string = '';
  protected readonly title = signal('taskproject');

  // دوال Nav و Search
  onUnitChange(unit: '°C' | '°F') {
    this.unit = unit;
  }

  onSearch(term: string) {
    this.searchTerm = term;
  }

  onDateChange(date: string) {
    this.selectedDate = date;
  }
}
