import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {path: '',children:[
    {path:'home', loadChildren: () => import('../weather-overview/weather-overview.module').then(m=>m.WeatherOverviewModule)},
    {path: '', redirectTo: 'home', pathMatch:'full'},
    {path: '**', redirectTo:'home'}
  ]
  ,component: ContainerComponent}
  ]
 ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
