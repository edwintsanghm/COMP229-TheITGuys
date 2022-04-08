import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveys-manage',
  templateUrl: './surveys-manage.component.html',
  styleUrls: ['./surveys-manage.component.css']
})
export class SurveysManageComponent implements OnInit {
  
dataSource:any = [];
displayedColumns = ['name','description','actions'];


constructor(private surveyService: SurveyService,private router: Router) { }

ngOnInit(): void {
  this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
}

onClickDelete(surveyId:string) {
  this.surveyService.deleteSurvey(surveyId).pipe(
    tap((data:any) => console.log('deleted')),
    switchMap((data) => this.surveyService.getSurveys()),
    map((data:any) => { console.log(data); 
      this.dataSource = data.surveyList})
  ).subscribe(() => console.log('refreshed list'));
}

onClickEdit(surveyId:string) {
  this.router.navigate(['/edit/'+surveyId]);
}

onClickStat(surveyId:string) {
  this.router.navigate(['/stat/'+surveyId]);
}
}
