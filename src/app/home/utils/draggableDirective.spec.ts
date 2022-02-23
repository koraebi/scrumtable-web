import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraggableDirective } from './draggableDirective';
describe('DraggableDirective', () => {
  let component: DraggableDirective;
  let fixture: ComponentFixture<DraggableDirective>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DraggableDirective],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
