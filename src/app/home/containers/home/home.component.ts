import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/app/home/model/issue.model';
import { HomeFacade } from '../../facades/home.facade';
import { ILabel } from '../../model/label.model';
import { globalLabels, labelsPartA, labelsPartB } from '../../data/labels';
import { Moscow } from '../../enum/moscow.enum';
import { MoscowDataFacade } from '../../facades/moscow-data.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  labels: ILabel = globalLabels;
  detailsList: Issue[] = [];
  message: string = '';

  reversed = false;
  splited = false;

  partALabels: ILabel = labelsPartA;
  partBLabels: ILabel = labelsPartB;
  partADetailsList: Issue[] = [];
  partBDetailsList: Issue[] = [];

  get listName(): string[] {
    return Object.keys(this.labels);
  }

  constructor(
    private homeFacade: HomeFacade,
    private moscowDataFacade: MoscowDataFacade
  ) {}

  ngOnInit() {
    this.moscowDataFacade.loadIssues();

    this.homeFacade
      .isReversed$()
      .subscribe((reversed) => (this.reversed = reversed));

    this.homeFacade
      .isSplited$()
      .subscribe((splited) => (this.splited = splited));

    /*
     * GLOBAL
     */

    this.moscowDataFacade
      .getAvailableIssues$()
      .subscribe((issues) => (this.labels['Available'].issues = issues));
    this.moscowDataFacade
      .getMustIssues$()
      .subscribe((issues) => (this.labels['Must'].issues = issues));
    this.moscowDataFacade
      .getShouldIssues$()
      .subscribe((issues) => (this.labels['Should'].issues = issues));
    this.moscowDataFacade
      .getCouldIssues$()
      .subscribe((issues) => (this.labels['Could'].issues = issues));
    this.moscowDataFacade
      .getWontIssues$()
      .subscribe((issues) => (this.labels["Won't"].issues = issues));
    this.moscowDataFacade
      .getDetailsIssues$()
      .subscribe((issues) => (this.detailsList = issues));

    /*
     * SPLIT PART A
     */

    this.moscowDataFacade
      .getAvailableIssuesPartA$()
      .subscribe((issues) => (this.partALabels['Available'].issues = issues));
    this.moscowDataFacade
      .getMustIssuesPartA$()
      .subscribe((issues) => (this.partALabels['Must'].issues = issues));
    this.moscowDataFacade
      .getShouldIssuesPartA$()
      .subscribe((issues) => (this.partALabels['Should'].issues = issues));
    this.moscowDataFacade
      .getCouldIssuesPartA$()
      .subscribe((issues) => (this.partALabels['Could'].issues = issues));
    this.moscowDataFacade
      .getWontIssuesPartA$()
      .subscribe((issues) => (this.partALabels["Won't"].issues = issues));
    this.moscowDataFacade
      .getDetailsIssuesPartA$()
      .subscribe((issues) => (this.partADetailsList = issues));

    /*
     * SPLIT PART B
     */

    this.moscowDataFacade
      .getAvailableIssuesPartB$()
      .subscribe((issues) => (this.partBLabels['Available'].issues = issues));
    this.moscowDataFacade
      .getMustIssuesPartB$()
      .subscribe((issues) => (this.partBLabels['Must'].issues = issues));
    this.moscowDataFacade
      .getShouldIssuesPartB$()
      .subscribe((issues) => (this.partBLabels['Should'].issues = issues));
    this.moscowDataFacade
      .getCouldIssuesPartB$()
      .subscribe((issues) => (this.partBLabels['Could'].issues = issues));
    this.moscowDataFacade
      .getWontIssuesPartB$()
      .subscribe((issues) => (this.partBLabels["Won't"].issues = issues));
    this.moscowDataFacade
      .getDetailsIssuesPartB$()
      .subscribe((issues) => (this.partBDetailsList = issues));
  }

  sendMessage() {
    //this.homeFacade.sendMessage('Message depuis le web');
  }

  onIssueSelected(issue: Issue): void {
    this.homeFacade.sendMessage('lockTabletIssue', issue.number.toString());
  }

  getIssueIndex(from: string, number: number){
    let index;
    if(from !== 'Details')
    for (let i = 0; i < this.labels[from].issues.length; i++){
      if (this.labels[from].issues[i].number === number)
        index = i;
    }
    else
      for (let i = 0; i < this.detailsList.length; i++){
        if (this.detailsList[i].number === number)
          index = i;
      }
    return index;
  }

  getSplitedIssueIndex(from: string, number: number, symbol: string) {
    let index;
    console.log(from)
    console.log(number)
    console.log(symbol)
    if (symbol === 'A')
    for (let i = 0; i < this.partADetailsList.length; i++){
      if (this.partADetailsList[i].number === number)
        index = i;
    }
    else
      for (let i = 0; i < this.partBDetailsList.length; i++){
        if (this.partBDetailsList[i].number === number)
          index = i;
      }
    return index;
  }

  onDrop(event: { from: string; to: string; issue: Issue }): void {
      this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());
      if (event.from === event.to) return;
      if (event.from === 'Details') this.homeFacade.closeIssueDetails(event.issue);
      else if (event.from === 'Available')
        this.homeFacade.addMoscowLabel(event.issue, event.to as Moscow);
      else if (event.to === 'Available') this.homeFacade.removeMoscowLabel(event.issue);
      else this.homeFacade.changeMoscowLabel(event.issue, event.to as Moscow);

  }

  onDropSplited(event: { from: string; to: string; issue: Issue }) {

      const splitFrom: 'A' | 'B' = event.from.split('-')[1] as 'A' | 'B';
      const splitTo: 'A' | 'B' = event.to.split('-')[1] as 'A' | 'B';

      const from = event.from.split('-')[0];
      const to = event.to.split('-')[0];
      /*let issue;

      if (from === 'Details')
        issue =
          splitFrom === 'A'
            ? this.partADetailsList[index]
            : this.partBDetailsList[index];
      else
        issue =
          splitFrom === 'A'
            ? this.partALabels[from].issues[index]
            : this.partBLabels[from].issues[index];*/

      if (from != to) {
        if (from === 'Details') this.homeFacade.closeIssueDetails(event.issue);
        else if (from === 'Available')
          this.homeFacade.addMoscowLabel(event.issue, to as Moscow);
        else if (to === 'Available') this.homeFacade.removeMoscowLabel(event.issue);
        else this.homeFacade.changeMoscowLabel(event.issue, to as Moscow);
      }

      this.homeFacade.updateSplitPart(event.issue, splitTo);

  }

  onDetailsDrop(event: { from: string; to: string; issue: Issue }) {
      if (event.from === event.to) return;
      this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());
      if (event.from != event.to) this.homeFacade.openIssueDetails(event.issue);
  }

  onDetailsDropSplited(event: {
    from: string;
    to: string;
    issue: Issue;
  }): void {

      const splitFrom: 'A' | 'B' = event.from.split('-')[1] as 'A' | 'B';
      const splitTo: 'A' | 'B' = event.to.split('-')[1] as 'A' | 'B';

      const from = event.from.split('-')[0];
      const to = event.to.split('-')[0];
      /*let issue;

      if (from === 'Details')
        issue =
          splitFrom === 'A'
            ? this.partADetailsList[index]
            : this.partBDetailsList[index];
      else
        issue =
          splitFrom === 'A'
            ? this.partALabels[from].issues[index]
            : this.partBLabels[from].issues[index];*/

      this.homeFacade.sendMessage('unlockTabletIssue', event.issue.number.toString());

      if (from != to) this.homeFacade.openIssueDetailsSplited(event.issue, splitTo);
      else this.homeFacade.updateSplitPart(event.issue, splitTo);
  }

  arrayRemove(arr: Issue[], value: Issue) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  selectedIssue(event: Issue) {
    console.log(event);
  }

  onReverse(): void {
    this.homeFacade.reverse();
  }

  onSplitScreen(): void {
    this.homeFacade.splitScreen();
  }
}
