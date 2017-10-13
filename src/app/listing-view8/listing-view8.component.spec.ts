import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView8Component } from './listing-view8.component';

describe('ListingView8Component', () => {
  let component: ListingView8Component;
  let fixture: ComponentFixture<ListingView8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
