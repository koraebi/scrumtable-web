import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';
import { HomeFacade } from '../../home.facade';
import { ILabel } from '../../model/label.model';
import { labels } from '../../data/labels';
import { Moscow } from '../../enum/moscow.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  labels: ILabel = labels;
  detailsListLeft: Issue[] = [];
  detailsListRight: Issue[] = [];
  message: string = '';

  get listName(): string[] {
    return Object.keys(this.labels);
  }

  constructor(private homeFacade: HomeFacade) {}

  ngOnInit() {
    this.homeFacade
      .getAvailableIssues$()
      .subscribe((issues) => (this.labels['Available'].issues = issues));
    this.homeFacade
      .getMustIssues$()
      .subscribe((issues) => (this.labels['Must'].issues = issues));
    this.homeFacade
      .getShouldIssues$()
      .subscribe((issues) => (this.labels['Should'].issues = issues));
    this.homeFacade
      .getCouldIssues$()
      .subscribe((issues) => (this.labels['Could'].issues = issues));
    this.homeFacade
      .getWontIssues$()
      .subscribe((issues) => (this.labels["Won't"].issues = issues));
    this.homeFacade
      .getDetailsIssues$("left")
      .subscribe((issues) => (this.detailsListLeft = issues));
    this.homeFacade
      .getDetailsIssues$("right")
      .subscribe((issues) => (this.detailsListRight = issues));
    this.homeFacade.loadIssues();
  }

  sendMessage() {
    //this.homeFacade.sendMessage('Message depuis le web');
  }

  onIssueSelected(issue: Issue): void {
    this.homeFacade.sendMessage('lockTabletIssue', issue.number.toString());
  }

  onDrop(event: { from: string; to: string; issue: Issue }): void {
    console.log(event.to);
    this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());

    if (event.from === event.to) return;

    if (event.from === 'left_details' || event.from === 'right_details') this.homeFacade.closeIssueDetails(event.issue);
    if (event.from === 'Available')
      this.homeFacade.addMoscowLabel(event.issue, event.to as Moscow);
    else if (event.to === 'Available') this.homeFacade.removeMoscowLabel(event.issue);
    else this.homeFacade.changeMoscowLabel(event.issue, event.to as Moscow);
  }

  onDetailsDrop(event: { from: string; to: string; issue: Issue }) {
    console.log(event.from);
    console.log(event.issue);
    console.log(event.to);

    this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());
    if (event.to === "right_details")
      event.issue.side="right"
    else
      event.issue.side="left"
    if (event.from != event.to) this.homeFacade.openIssueDetails(event.issue);
  }

  arrayRemove(arr: Issue[], value: Issue) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  selectedIssue(event: Issue) {
    console.log(event);
  }
}
