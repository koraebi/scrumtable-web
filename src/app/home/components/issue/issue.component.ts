import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/core/model/issue.model';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input()
  issue?: Issue;

  @Output()
  selected = new EventEmitter<Issue>();

  get issueSelected() {
    if (this.issue)
      return this.issue.selected;
    else
      return false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
