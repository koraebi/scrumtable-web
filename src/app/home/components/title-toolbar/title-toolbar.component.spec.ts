import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleToolbarComponent } from './title-toolbar.component';

describe('TitleToolbarComponent', () => {
  let component: TitleToolbarComponent;
  let fixture: ComponentFixture<TitleToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
