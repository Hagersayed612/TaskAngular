import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Citycard } from './citycard';

describe('Citycard', () => {
  let component: Citycard;
  let fixture: ComponentFixture<Citycard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Citycard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Citycard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
