import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-surveys-manage',
  templateUrl: './surveys-manage.component.html',
  styleUrls: ['./surveys-manage.component.css']
})
export class SurveysManageComponent implements OnInit {
  
dataSource:any = [];
displayedColumns = ['name','description','actions'];


constructor(private surveyService: SurveyService) { }

ngOnInit(): void {
  this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
}
}
