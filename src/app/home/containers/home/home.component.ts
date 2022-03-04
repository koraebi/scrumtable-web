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
  isEditing = false;

  get listName(): string[] {
    return Object.keys(this.labels);
  }

  constructor(private homeFacade: HomeFacade) {}

  ngOnInit() {
    this.homeFacade.getActionEmited$().subscribe(action => this.processAction(action));
    var log=this.homeFacade.getActionEmited$().subscribe(action => this.processAction(action));
    console.log(log);
    this.homeFacade.loadIssues();

    this.homeFacade
      .getAvailableIssues$()
      .subscribe((issues) => (this.labels['Todo'].issues = issues));
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
  processAction(action: any) {
    //console.log(action.issue_number);
    //console.log(action.new_label);
    if (this.isEditing) {
      this.isEditing = false;
      return;
    }

    let message = 'Le Label \"' + action.new_label + "\" a été attribué à l'issue #" + action.issue_number;

    this.homeFacade.updateIssue(action.issue_number, action.new_label);
  }


  onDrop(event: { from: string; to: string; issue: Issue }): void {
    const from = event.from.split('-')[0];
    const to = event.to.split('-')[0];
    this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());

    if (from === to) return;

    if (from === 'left_details' || from === 'right_details') this.homeFacade.closeIssueDetails(event.issue);

    this.isEditing = true;

    if ( to === 'Todo')
      this.homeFacade.addMoscowLabel(event.issue, to as Moscow);

    else this.homeFacade.addMoscowLabel(event.issue,to as Moscow);
  }

  onDetailsDrop(event: { from: string; to: string; issue: Issue }) {


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
    //console.log(event);
  }
}
