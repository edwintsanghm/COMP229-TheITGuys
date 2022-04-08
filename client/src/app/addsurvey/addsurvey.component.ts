import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent implements OnInit {
  form = this.fb.group({
    name:['', Validators.required],
    description:[''],
    questions: this.fb.array([])
  });

  
  private optionValidators = [];

  constructor(private fb:FormBuilder, private surveyService: SurveyService, private router: Router) {}

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
          option: ['', this.optionValidators]
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

  ngOnInit(): void {

 
  }

  onSelectChange(questionForm:any, i:number) {
    if(questionForm.value.type == 'text') {
      questionForm.get('option').setValidators(Validators.required);
    } else {
      questionForm.get('option').clearValidators();
    }
    questionForm.get('option').updateValueAndValidity();
  }

  onSubmit() {
    
    this.form.value.questions.map((question:any) => {          
      question.choices = question.choices.map((choice:any) => {
        return choice.option;
      });
    });

    this.surveyService.addSurvey(this.form.value)
    this.router.navigate(['/surveysManage']);
  }
}
