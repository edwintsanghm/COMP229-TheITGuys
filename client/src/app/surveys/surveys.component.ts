import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  dataSource:any = [];
  displayedColumns = ['name','description','respondSurvey'];

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
  }

}
