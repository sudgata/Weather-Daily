import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherBasicDetailsComponent } from './weather-basic-details.component';

describe('WeatherBasicDetailsComponent', () => {
  let component: WeatherBasicDetailsComponent;
  let fixture: ComponentFixture<WeatherBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
