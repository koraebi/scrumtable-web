import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniIssueComponent } from './mini-issue.component';

describe('MiniIssueComponent', () => {
  let component: MiniIssueComponent;
  let fixture: ComponentFixture<MiniIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
