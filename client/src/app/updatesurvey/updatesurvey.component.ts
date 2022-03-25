import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { StylesManager, Model, SurveyNG  } from "survey-angular";
import { SurveyService } from '../survey.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-updatesurvey',
  templateUrl: './updatesurvey.component.html',
  styleUrls: ['./updatesurvey.component.css']
})
export class UpdatesurveyComponent implements OnInit {
 

  constructor(private fb:FormBuilder, private surveyService: SurveyService,private route: ActivatedRoute,private router: Router) {}
  survey$!:Observable<any>;
  survey = {"_id":{"$oid":"623ce087103ac9a45ec32cb5"},"name":"S1","description":"SD1",
  "questions":[{"title":"Question1 ","type":"radiogroup",
  "choices":[{"option":"sample option1","_id":{"$oid":"623ce087103ac9a45ec32cb7"}},{"option":"sample option2","_id":{"$oid":"623ce087103ac9a45ec32cb8"}},{"option":"sample option3","_id":{"$oid":"623ce087103ac9a45ec32cb9"}}],"_id":{"$oid":"623ce087103ac9a45ec32cb6"}}],"__v":{"$numberInt":"0"}};
  
  form = this.fb.group({
    name:[this.survey.name, Validators.required],
    description:[this.survey.description],
    questions: this.fb.array([])
  });

  ngOnInit(): void {
    this.survey$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.surveyService.getSurveyById(params.get('id')!))
    );
    
    // const surveyId = this.route.paramMap
    // this.surveyService.getSurveyById().subscribe((data: any) => { console.log(data); this.survey = data.survey});

    this.survey$.pipe(
      map(survey => (survey.questions)),
      tap(questions=> console.log('pipe', questions))
    )

    if(this.survey.questions.length > 0) {
      this.survey.questions.map(question => {   
        
        const questionForm = this.fb.group({
          title: [question.title, Validators.required],
          type: [question.type, Validators.required],
          choices: this.fb.array([])
        });

        let choiceForm = this.getChoices(questionForm);
        if(question.choices.length > 0) {
          question.choices.map(choice => 
            choiceForm.push(this.fb.group({"option": [choice.option, Validators.required]}))
          )
        } 
      
        this.questions.push(questionForm);
        
      })
    }
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
    console.log('onSubmit', this.form.value);
    this.surveyService.addSurvey(this.form.value)

  }

}
