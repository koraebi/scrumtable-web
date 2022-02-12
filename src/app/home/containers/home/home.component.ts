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
  detailsList: Issue[] = [];
  message: string = '';

  get listName(): string[] {
    return Object.keys(this.labels);
  }

  constructor(private homeFacade: HomeFacade) {}

  ngOnInit() {
    this.homeFacade
      .getMessage$()
      .subscribe((message) => (this.message = message));
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
      .getDetailsIssues$()
      .subscribe((issues) => (this.detailsList = issues));
    this.homeFacade.loadIssues();
  }

  sendMessage() {
    //this.homeFacade.sendMessage('Message depuis le web');
  }

  onIssueSelected(issue: Issue): void {
    this.homeFacade.lockIssue(issue);
  }

  onDrop(event: { from: string; to: string; index: number }): void {
    if (event.from != event.to) {
      if (event.from === 'Details')
        this.homeFacade.closeIssueDetails(this.detailsList[event.index]);
      else if (event.from === 'Available')
        this.homeFacade.addMoscowLabel(
          this.labels[event.from].issues[event.index],
          event.to as Moscow
        );
      else if (event.to === 'Available')
        this.homeFacade.removeMoscowLabel(
          this.labels[event.from].issues[event.index]
        );
      else
        this.homeFacade.changeMoscowLabel(
          this.labels[event.from].issues[event.index],
          event.to as Moscow
        );
    }

    this.homeFacade.sendMessage('updateMobileIssues', '');
  }

  onDetailsDrop(event: { from: string; to: string; index: number }) {
    if (event.from != event.to)
      this.homeFacade.openIssueDetails(
        this.labels[event.from].issues[event.index]
      );
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
