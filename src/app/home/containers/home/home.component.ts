import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';
import { HomeFacade } from '../../home.facade';
import {ILabel} from "../../model/label.model";
import {labels} from "../../data/labels";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  labels : ILabel = labels;


  get listName(): string[] {
    return Object.keys(this.labels);
  }

  constructor(private homeFacade: HomeFacade) {
  }

  ngOnInit() {
    this.homeFacade.getAvailableIssues$().subscribe(issues => this.labels["Available"].issues = issues);
    this.homeFacade.getMustIssues$().subscribe(issues => this.labels["Must"].issues = issues);
    this.homeFacade.getShouldIssues$().subscribe(issues => this.labels["Should"].issues = issues);
    this.homeFacade.getCouldIssues$().subscribe(issues => this.labels["Could"].issues = issues);
    this.homeFacade.getWontIssues$().subscribe(issues => this.labels["Won't"].issues = issues);
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
      this.homeFacade.transferIssue(event.from, event.to, this.labels[event.from].issues[event.index]);
  }
}
