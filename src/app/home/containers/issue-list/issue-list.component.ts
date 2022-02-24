import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';
import { IContent } from '../../model/label.model';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  @Input()
  name: string = '';

  @Input()
  id: string = '';

  @Input()
  content?: IContent;

  @Input()
  reversed: boolean = false;

  @Output()
  drop = new EventEmitter<{ from: string; to: string; issue: Issue}>();

  @Output()
  issueSelected = new EventEmitter<Issue>();

  constructor() {}

  ngOnInit(): void {}


  onMultiDrop(event: any) {
    console.log(event)
    this.drop.emit(
      {
        from: event.from,
        to: event.to,
        issue: event.issue,
      }
    )
  }

  signal($event: any) {
    //console.log(event)
  }
}
