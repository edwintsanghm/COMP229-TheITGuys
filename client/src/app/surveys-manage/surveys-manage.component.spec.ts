import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysManageComponent } from './surveys-manage.component';

describe('SurveysManageComponent', () => {
  let component: SurveysManageComponent;
  let fixture: ComponentFixture<SurveysManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveysManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
