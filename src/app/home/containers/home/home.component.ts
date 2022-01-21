import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/core/model/issue.model';
import { HomeFacade } from '../../home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issues: Issue[] = [];

  constructor(private homeFacade: HomeFacade) {
    homeFacade.getIssues$().subscribe(issues => this.issues = issues);
  }

  ngOnInit() {
    this.homeFacade.loadIssues();
  }

  sendMessage() {
    this.homeFacade.sendMessage('Touched');
  }

  onIssueSelected(issue: Issue): void {
    this.homeFacade.selectIssue(issue);
  }
}
