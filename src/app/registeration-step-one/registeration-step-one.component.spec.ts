import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationStepOneComponent } from './registeration-step-one.component';

describe('RegisterationStepOneComponent', () => {
  let component: RegisterationStepOneComponent;
  let fixture: ComponentFixture<RegisterationStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
