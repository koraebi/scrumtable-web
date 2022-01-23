import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/core/model/issue.model';
import { HomeFacade } from '../../home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issues: { [key: string]: Issue[]} = {
    "Available": [],
    "Must": [],
    "Should": [],
    "Could": [],
    "Won't": [],
  };

  get listName(): string[] {
    return Object.keys(this.issues);
  }

  constructor(private homeFacade: HomeFacade) {
    this.homeFacade.getAvailableIssues$().subscribe(issues => this.issues["Available"] = issues);
    this.homeFacade.getMustIssues$().subscribe(issues => this.issues["Must"] = issues);
    this.homeFacade.getShouldIssues$().subscribe(issues => this.issues["Should"] = issues);
    this.homeFacade.getCouldIssues$().subscribe(issues => this.issues["Could"] = issues);
    this.homeFacade.getWontIssues$().subscribe(issues => this.issues["Won't"] = issues);
  }

  ngOnInit() {
    this.homeFacade.loadIssues();
  }

  sendMessage() {
    this.homeFacade.sendMessage('Touched');
  }

  onIssueSelected(issue: Issue): void {
    // TODO
  }

  onDrop(event: {from: string, to: string, index: number}): void {
    if(event.from != event.to) 
      this.homeFacade.transferIssue(event.from, event.to, this.issues[event.from][event.index]);
  }
}
