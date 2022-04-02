import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { StylesManager, Model, SurveyNG  } from "survey-angular";
import { SurveyService } from '../survey.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-updatesurvey',
  templateUrl: './updatesurvey.component.html',
  styleUrls: ['./updatesurvey.component.css']
})
export class UpdatesurveyComponent implements OnInit {
 
  constructor(private fb:FormBuilder, private surveyService: SurveyService,private route: ActivatedRoute,private router: Router) {}

  form = this.fb.group({
    name:['', Validators.required],
    description:[''],
    questions: this.fb.array([])
  });
  surveyId!:string;


  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.surveyService.getSurveyById(params.get('id')!))
    ).pipe(
      map((data:any) => {
        this.form.patchValue({
          name: data.survey.name,
          description: data.survey.description,
        })

        this.surveyId = data.survey._id;
        return data.survey.questions;
      }),
      tap((questions:any)=> {
        if(questions.length > 0) {
          questions.map((question:any) => {   
            const questionForm = this.fb.group({
              title: [question.title, Validators.required],
              type: [question.type, Validators.required],
              choices: this.fb.array([])
            });
    
            let choiceForm = this.getChoices(questionForm);
            if(question.choices?.length > 0) {
              question.choices.map((choice:any) => 
                choiceForm.push(this.fb.group({"option": [choice]}))
              )
            } 
            this.questions.push(questionForm);
          })
        }
      }),
    ).subscribe();


    // console.log(this.questions)
    // this.questions..get('type')?.valueChanges.subscribe(value => {
    //   console.log(value)
    //   if(value != "text") {
    //     this.form.get('option')?.clearValidators();
    //   } else {

    //   }
    // })
        

  }
 
  
get questions() {
  return this.form.controls["questions"] as FormArray;
}

getChoices(questionForm:FormGroup) {
  return questionForm.controls['choices'] as FormArray;
}

addQuestion() {
  const questionForm = this.fb.group({
    title: ['', Validators.required],
    type: ['', Validators.required],
    choices: this.fb.array([
      this.fb.group({
        option: ['']
      })
    ]),
  });

  this.questions.push(questionForm);
}

deleteQuestion(questionIndex: number) {
  this.questions.removeAt(questionIndex);
}
  addChoice(choices:any) {
    const choiceForm = this.fb.group({
      option: ['', Validators.required]
    });

    choices.push(choiceForm);
  }

  deleteChoice(choices:any, choiceIndex: number) {
    choices.removeAt(choiceIndex);
  }

  onSubmit() {    
    this.form.value.questions.map((question:any) => {          
      question.choices = question.choices.map((choice:any) => {
        return choice.option;
      });
    });

    console.log('onSubmit', this.form.value);

    this.surveyService.updateSurvey(this.surveyId, this.form.value);
    this.router.navigate(['/surveysManage']);
  }

}
