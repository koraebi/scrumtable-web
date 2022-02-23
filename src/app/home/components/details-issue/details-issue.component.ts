import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from '../../model/issue.model';

@Component({
  selector: 'app-details-issue',
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.css'],
})
export class DetailsIssueComponent implements OnInit {
  @Input()
  issue?: Issue;

  @Input()
  parent?: string;

  @Output()
  selected = new EventEmitter<Issue>();
  constructor() {}

  get issueSelected() {
    if (this.issue) return this.issue.selected;
    else return false;
  }

  getModel() {
    return {
      from: this.parent,
      issue: this.issue
    }
  }

  ngOnInit(): void {}
}
