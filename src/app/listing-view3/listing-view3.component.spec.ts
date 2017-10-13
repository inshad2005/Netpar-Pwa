import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView3Component } from './listing-view3.component';

describe('ListingView3Component', () => {
  let component: ListingView3Component;
  let fixture: ComponentFixture<ListingView3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
