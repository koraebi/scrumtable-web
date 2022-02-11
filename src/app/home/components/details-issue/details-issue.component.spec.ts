import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsIssueComponent } from './details-issue.component';

describe('DetailsIssueComponent', () => {
  let component: DetailsIssueComponent;
  let fixture: ComponentFixture<DetailsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
