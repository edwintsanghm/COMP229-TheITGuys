import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '../survey.service';
import { switchMap, map, tap, debounceTime } from 'rxjs/operators';
import { fromEvent, Observable, race } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-surveys-manage',
  templateUrl: './surveys-manage.component.html',
  styleUrls: ['./surveys-manage.component.css']
})
export class SurveysManageComponent implements OnInit {
    
  dataSource:any = [];
  displayedColumns = ['name','description','actions'];

  constructor(private surveyService: SurveyService, private snackBar:MatSnackBar) { }


  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe((data: any) => { console.log(data); this.dataSource = data.surveyList});
  }

  onClickDelete(surveyId:string, name:string) {
      this.surveyService.deleteSurvey(surveyId).pipe(
        switchMap((data) => this.surveyService.getSurveys()),
        map((data:any) => { 
          this.dataSource = data.surveyList;
          this.snackBar.open("Survey \'"+ name +"\' Deleted")
        })
      ).subscribe();
  }
}
