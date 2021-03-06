import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { SurveysComponent } from './surveys/surveys.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { UpdatesurveyComponent } from './updatesurvey/updatesurvey.component';
import { RespondComponent } from './respond/respond.component';
import { SurveysManageComponent } from './surveys-manage/surveys-manage.component';
import { SurveyStatComponent } from './survey-stat/survey-stat.component';
import { MatCardModule } from '@angular/material/card';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { LoginService} from './login.service';
import { SurveyService} from './survey.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {MatListModule} from '@angular/material/list';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SurveysComponent,
    AddsurveyComponent,
    UpdatesurveyComponent,
    RespondComponent,
    SurveysManageComponent,
    SurveyStatComponent,
    SignupComponent,
    LoginComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [AuthGuard, LoginService, SurveyService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },{ 
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
    useValue: {duration: 3500}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
