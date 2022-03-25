
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
        // this.form.patchValue({
        //   name: data.survey.name,
        //   description: data.survey.description,
        // })

        // console.log(data.survey._id)
        // this.surveyId = data.survey._id;
        // console.log( this.surveyId)
        const self = this;
        StylesManager.applyTheme("modern");
        const survey = new Model(data.survey);
        survey.onComplete.add((sender:any, options:any) => {
          const result = { ...sender.data, surveyId: data.survey._id};

          console.log(result);
        });

        SurveyNG.render("surveyContainer", { model: survey });
      }),
    ).subscribe();

  }

}
