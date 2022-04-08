import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  dataSource:any = [];
  displayedColumns = ['name','description','respondSurvey'];

  constructor(private surveyService: SurveyService, private router: Router) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
  }

  onClickRespond(surveyId:string) {
    this.router.navigate(['/respond/'+surveyId]);
  }

}
