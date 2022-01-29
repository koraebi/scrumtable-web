import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  @Input()
  issue?: Issue;

  @Input()
  color?: string;

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
