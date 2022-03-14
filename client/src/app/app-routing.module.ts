import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SurveysComponent } from './surveys/surveys.component';

const routes: Routes = [{
  path:'', component: LandingComponent
},{
  path:'surveys', component: SurveysComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
