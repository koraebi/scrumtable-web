import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from '../../model/issue.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  issue: Issue;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  @Input()
  detailsList: Issue[] = [];

  @Input()
  id: string = 'Details';

  @Input()
  reversed: boolean = false;

  @Output()
  drop = new EventEmitter<{ from: string; to: string; number: number }>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  onDrop(event: CdkDragDrop<Issue[]>) {
    console.log(event);
    this.drop.emit({
      from: event.previousContainer.id,
      to: event.container.id,
      number: event.previousIndex,
    });
  }

  onMultiDrop(event: any) {
    console.log(event);
    this.drop.emit(
      {
        from: event.from,
        to: event.to,
        number: event.number,
      }
    )
  }

  signal(event: any) {
    console.log(event);
  }
}
