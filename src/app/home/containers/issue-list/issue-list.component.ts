import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';
import {IContent} from "../../model/label.model";

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  @Input()
  name: string = "";
  p: number = 1;

  @Input()
  content?: IContent;

  @Output()
  drop = new EventEmitter<{from: string, to: string, index: number}>();

  @Output()
  issueSelected = new EventEmitter<Issue>();

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
