
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { StylesManager, Model, SurveyNG  } from "survey-angular";
import { SurveyService } from '../survey.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.css']
})
export class RespondComponent implements OnInit {

  surveyId!: string;
  constructor(private fb:FormBuilder, private surveyService: SurveyService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.surveyService.getSurveyById(params.get('id')!))
    ).pipe(
      map((data:any) => {
        StylesManager.applyTheme("modern");
        const survey = new Model(data.survey);
        console.log(data.survey.questions[0])
        survey.onComplete.add((sender:any, options:any) => {
          let surveyData = data.survey;
          for (const [key, value] of Object.entries(sender.data)) {
            console.log(`${key.replace('question', '')}: ${value}`);
            let i = Number(key.replace('question', ''))-1;
            surveyData.questions[i].selectedOption = value;
          }

          this.surveyService.respondSurvey(data.survey._id, surveyData);

        });

        SurveyNG.render("surveyContainer", { model: survey });
      }),
      tap((result:any) => console.log('result', result))
    ).subscribe();

  }

}
