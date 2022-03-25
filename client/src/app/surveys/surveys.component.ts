import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
// [{"_id":"622c0d88aedc4ead68ef6f10","name":"Test","code":"123","lecture_per_week":2,"description":"asd","lab_per_week":2,"availability":"Yes","__v":0}];
  dataSource:any = [];
  displayedColumns = ['name','description','respondSurvey'];
//   {
//     "name":"Test survey",
//     "description":"description",
//     "questions":[{"title":"q1","qtype":"MC","options":["A","B","C","D"],"selectedOption":"B"}]
// }

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
  }

}
