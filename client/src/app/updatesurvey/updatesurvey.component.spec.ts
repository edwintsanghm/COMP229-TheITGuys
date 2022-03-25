import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesurveyComponent } from './updatesurvey.component';

describe('UpdatesurveyComponent', () => {
  let component: UpdatesurveyComponent;
  let fixture: ComponentFixture<UpdatesurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
