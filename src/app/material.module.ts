import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    exports: [MatInputModule,
              MatCardModule,
              MatToolbarModule,
              MatDividerModule,
              MatTableModule,
              MatProgressSpinnerModule,
              MatIconModule,
              MatAutocompleteModule,
              MatFormFieldModule],
})
export class WeatherMaterialModule { }
