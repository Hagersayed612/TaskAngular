import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', 
          style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class Search {
  searchTerm: string = '';
  selectedDate: string = '';
  selectedDateFilter: string = 'all';
  showCustomDate: boolean = false;

  @Output() search = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();

  selectDateFilter(filter: string) {
    this.selectedDateFilter = filter;
    this.showCustomDate = false;
    
    const today = new Date();
    
    switch(filter) {
      case 'all':
        this.selectedDate = '';
        break;
      case 'today':
        this.selectedDate = today.toISOString().split('T')[0];
        break;
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.selectedDate = tomorrow.toISOString().split('T')[0];
        break;
      case 'week':
        this.selectedDate = 'week';
        break;
    }
    
    this.dateChange.emit(this.selectedDate);
  }

  toggleCustomDate() {
    this.selectedDateFilter = 'custom';
    this.showCustomDate = !this.showCustomDate;
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onDateChange() {
    this.dateChange.emit(this.selectedDate);
  }

  clearSearch() {
    this.searchTerm = '';
    this.search.emit('');
  }

  resetFilters() {
    this.selectedDateFilter = 'all';
    this.selectedDate = '';
    this.showCustomDate = false;
    this.dateChange.emit('');
  }

  formatSelectedDate(): string {
    if (!this.selectedDate || this.selectedDate === 'week') {
      return 'Next 7 days';
    }
    
    const date = new Date(this.selectedDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}