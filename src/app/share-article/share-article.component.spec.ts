import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareArticleComponent } from './share-article.component';

describe('ShareArticleComponent', () => {
  let component: ShareArticleComponent;
  let fixture: ComponentFixture<ShareArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
