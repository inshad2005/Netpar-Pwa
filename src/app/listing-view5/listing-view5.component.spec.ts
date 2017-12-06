import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingView5Component } from './listing-view5.component';

describe('ListingView5Component', () => {
  let component: ListingView5Component;
  let fixture: ComponentFixture<ListingView5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingView5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingView5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
