import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { LandingComponent } from './landing/landing.component';
import { SurveysComponent } from './surveys/surveys.component';
import { UpdatesurveyComponent } from './updatesurvey/updatesurvey.component';
import { RespondComponent } from './respond/respond.component';
import { SurveysManageComponent } from './surveys-manage/surveys-manage.component';
import { SurveyStatComponent } from './survey-stat/survey-stat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path:'', component: LandingComponent
},{
  path:'login', component: LoginComponent
},{
  path:'signup', component: SignupComponent
},{
  path:'surveys', component: SurveysComponent
},{
  path:'add', component: AddsurveyComponent
},{
  path: 'edit/:id', component: UpdatesurveyComponent 
},{
  path:'respond/:id', component: RespondComponent
},{
  path:'surveysManage', component: SurveysManageComponent
},{
  path:'stat/:id', component: SurveyStatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
