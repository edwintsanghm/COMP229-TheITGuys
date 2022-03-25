import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { LandingComponent } from './landing/landing.component';
import { SurveysComponent } from './surveys/surveys.component';
import { UpdatesurveyComponent } from './updatesurvey/updatesurvey.component';

const routes: Routes = [{
  path:'', component: LandingComponent
},{
  path:'surveys', component: SurveysComponent
},{
  path:'add', component: AddsurveyComponent
},{
  path: 'edit/:id', component: UpdatesurveyComponent 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
