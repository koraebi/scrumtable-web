import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroppableDirective } from './droppableDirective';
describe('DroppableDirective', () => {
  let component: DroppableDirective;
  let fixture: ComponentFixture<DroppableDirective>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DroppableDirective],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DroppableDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
