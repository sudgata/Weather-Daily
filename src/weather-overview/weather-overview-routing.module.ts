import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherOverviewComponent } from './weather-overview.component';

const routes: Routes = [
  {path: '',children:[
    {path:'weather-overview', component: WeatherOverviewComponent},
    {path: '', redirectTo: 'weather-overview',pathMatch:'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherOverviewRoutingModule { }
