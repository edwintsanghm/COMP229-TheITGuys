import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { StylesManager, Model, SurveyNG  } from "survey-angular";
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Enter your first name:",
    enableIf: false,
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  },{
    type: "radiogroup",
    name: "car",
    title: "What car are you driving?",
    // isRequired: true,
    // hasNone: true,
    choices: [
        "Ford",
        "Vauxhall",
        "Volkswagen",
        "Nissan"
    ]
  },{
    type: "dropdown",
    name: "car",
    title: "What car are you driving?",
    // isRequired: true,
    // hasNone: true,
    choices: [
        "Ford",
        "Vauxhall",
        "Volkswagen",
        "Nissan"
    ]
  }]
};

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
          option: ['', Validators.required]
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
