import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-survey-stat',
  templateUrl: './survey-stat.component.html',
  styleUrls: ['./survey-stat.component.css']
})
export class SurveyStatComponent implements OnInit {

  dataSource:any = [];

  constructor(private surveyService: SurveyService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.surveyService.getSurveySummary(params.get('id')!))
    ).subscribe((data: any) => { console.log(data); this.dataSource = data.findedUserResponse; console.log(this.dataSource)});

   // this.surveyService.getSurveySummary().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
 
  }

}
