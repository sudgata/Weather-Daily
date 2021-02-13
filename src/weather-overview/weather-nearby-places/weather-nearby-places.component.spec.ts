import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherNearbyPlacesComponent } from './weather-nearby-places.component';

describe('WeatherNearbyPlacesComponent', () => {
  let component: WeatherNearbyPlacesComponent;
  let fixture: ComponentFixture<WeatherNearbyPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherNearbyPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherNearbyPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
