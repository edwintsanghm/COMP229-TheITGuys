import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsurveyComponent } from './addsurvey.component';

describe('AddsurveyComponent', () => {
  let component: AddsurveyComponent;
  let fixture: ComponentFixture<AddsurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
