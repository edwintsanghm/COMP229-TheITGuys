import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, tap, filter, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  isEditMode!:boolean;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params:ParamMap) => {
        if(params.get('id')!= null) {
          this.isEditMode = true;
        } else {
          this.isEditMode = false;
          this.addQuestion();
        }
        return params.get('id') != null;
      }),
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
                choiceForm.push(this.fb.group({"option": [choice, Validators.required]}))
              )
            }

            this.initQuestionTypeChangeListener(questionForm);
            
            this.questions.push(questionForm);
          })
        }
      }),
      catchError((err:any) => of("Error: ", err))
    ).subscribe(val => console.log(val));
  }

  initQuestionTypeChangeListener(questionForm:FormGroup) {
    console.log("initQuestionTypeChangeListener")
    questionForm.get('type')?.valueChanges.subscribe((value:any) => {
      
      if(questionForm.contains('choices'))
        questionForm.removeControl('choices');

      let choices = new FormArray([]);
      questionForm.addControl('choices',choices);
      if(value != 'text') {
        choices.push(this.fb.group({option: ['', Validators.required]}))
      } else {
        choices.push(this.fb.group({option: ['']}))
      }
      questionForm.updateValueAndValidity();
    });
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
    });

    let choices = new FormArray([]);
    if(this.form.value.type = 'text') {
      choices.push(this.fb.group({option: ['']}))
      questionForm.addControl('choices', choices)
    } else {
      choices.push(this.fb.group({option: ['', Validators.required]}))
      questionForm.addControl('choices', choices)
    }
    
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

    if(this.isEditMode){
      this.surveyService.updateSurvey(this.surveyId, this.form.value);
    } else {
      this.surveyService.addSurvey(this.form.value);
    }
    this.router.navigate(['/surveysManage']);
  }

}
