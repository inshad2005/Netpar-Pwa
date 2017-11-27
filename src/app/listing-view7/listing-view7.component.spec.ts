import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView7Component } from './listing-view7.component';

describe('ListingView7Component', () => {
  let component: ListingView7Component;
  let fixture: ComponentFixture<ListingView7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
