import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/core/model/issue.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  @Input()
  name: string = "";

  @Input()
  issues: Issue[] = [];

  @Output()
  drop = new EventEmitter<{from: string, to: string, index: number}>();

  constructor() { }

  ngOnInit(): void {
  }

  onDrop(event: CdkDragDrop<Issue[]>) {
    this.drop.emit({
      from: event.previousContainer.id,
      to: event.container.id,
      index: event.previousIndex
    });
  }
}
