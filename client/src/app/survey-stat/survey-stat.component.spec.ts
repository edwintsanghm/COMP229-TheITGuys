import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStatComponent } from './survey-stat.component';

describe('SurveyStatComponent', () => {
  let component: SurveyStatComponent;
  let fixture: ComponentFixture<SurveyStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
