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
  // survey$!:Observable<any>;
  // survey = {"_id":{"$oid":"623ce087103ac9a45ec32cb5"},"name":"S1","description":"SD1",
  // "questions":[{"title":"Question1 ","type":"radiogroup",
  // "choices":[{"option":"sample option1","_id":{"$oid":"623ce087103ac9a45ec32cb7"}},{"option":"sample option2","_id":{"$oid":"623ce087103ac9a45ec32cb8"}},{"option":"sample option3","_id":{"$oid":"623ce087103ac9a45ec32cb9"}}],"_id":{"$oid":"623ce087103ac9a45ec32cb6"}}],"__v":{"$numberInt":"0"}};
  
  // form = this.fb.group({
  //   name:[this.survey.name, Validators.required],
  //   description:[this.survey.description],
  //   questions: this.fb.array([])
  // });
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
        console.log(data);
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
            if(question.choices.length > 0) {
              question.choices.map((choice:any) => 
                choiceForm.push(this.fb.group({"option": [choice.option, Validators.required]}))
              )
            } 
            this.questions.push(questionForm);
          })
        }
      })
    ).subscribe();
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
        option: ['sample option', Validators.required]
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
      option: ['sample option', Validators.required]
    });

    choices.push(choiceForm);
  }

  deleteChoice(choices:any, choiceIndex: number) {
    choices.removeAt(choiceIndex);
  }

  // ngOnInit(): void {
  //   // this.sf = this.surveyForm.controls['questions']);
  //   StylesManager.applyTheme("modern");
  //   const survey = new Model(surveyJson);
  //   survey.onComplete.add(this.alertResults);

  //   SurveyNG.render("surveyContainer", { model: survey });
  // }


  onSubmit() {    
    this.form.value.questions.map((question:any) => {          
      question.choices = question.choices.map((choice:any) => {
        return choice.option;
      });
    });

    console.log('onSubmit', this.form.value);

    this.surveyService.updateSurvey(this.surveyId, this.form.value)

  }

}
