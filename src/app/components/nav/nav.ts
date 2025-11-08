import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav {
  @Output() unitChange = new EventEmitter<'°C' | '°F'>();
  unit: '°C' | '°F' = '°C';

  toggleUnit() {
    this.unit = this.unit === '°C' ? '°F' : '°C';
    this.unitChange.emit(this.unit);
  }
}