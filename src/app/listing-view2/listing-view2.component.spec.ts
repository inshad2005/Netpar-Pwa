import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView2Component } from './listing-view2.component';

describe('ListingView2Component', () => {
  let component: ListingView2Component;
  let fixture: ComponentFixture<ListingView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
