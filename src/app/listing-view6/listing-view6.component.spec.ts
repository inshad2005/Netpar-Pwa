import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView6Component } from './listing-view6.component';

describe('ListingView6Component', () => {
  let component: ListingView6Component;
  let fixture: ComponentFixture<ListingView6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
