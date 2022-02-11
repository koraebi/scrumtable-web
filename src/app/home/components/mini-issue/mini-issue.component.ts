import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Issue} from "../../model/issue.model";

@Component({
  selector: 'app-mini-issue',
  templateUrl: './mini-issue.component.html',
  styleUrls: ['./mini-issue.component.css']
})
export class MiniIssueComponent implements OnInit {
  @Input()
  issue?: Issue;

  @Input()
  color?: string;

  @Output()
  selected = new EventEmitter<Issue>();
  constructor() { }

  get issueSelected() {
    if (this.issue)
      return this.issue.selected;
    else
      return false;
  }

  ngOnInit(): void {
  }

}
