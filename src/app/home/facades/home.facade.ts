import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IssueAPI } from '../../core/api/issues.api';
import { Moscow } from '../enum/moscow.enum';
import { Issue } from '../model/issue.model';
import { SocketService } from '../../core/services/socket.service';
import { HomeState } from '../state/home.state';

@Injectable()
export class HomeFacade {
  constructor(
    private socketService: SocketService,
    private homeState: HomeState,
    private issuesAPI: IssueAPI
  ) {}

  // Socket

  getActionEmited$(): Observable<any>{
    return this.socketService.getMessage();
  }

  sendMessage(event: string, message: string): void {
    this.socketService.sendMessage(event, message);
  }

  // Issues

  openIssueDetails(issue: Issue): void {
    issue.details = true;
    this.homeState.updateIssue(issue);
    this.socketService.sendMessage('selectIssue', JSON.stringify(issue));
  }

  closeIssueDetails(issue: Issue): void {
    issue.details = false;
    this.homeState.updateIssue(issue);
    this.socketService.sendMessage('unselectIssue', JSON.stringify(issue));
  }

  setMoscowLabel(issue: Issue, moscow: Moscow): void {
    // set the new moscow label
    issue.moscow = moscow;
    this.homeState.updateIssue(issue);
    this.issuesAPI.addLabelToIssue(issue, moscow).subscribe(
      // then update state
      (resultIssue) => {}
    );
  }

  isReversed$(): Observable<boolean> {
    return this.homeState.isReversed$();
  }

  reverse(): void {
    this.homeState.reverse();
  }

  isSplited$(): Observable<boolean> {
    return this.homeState.isSplited$();
  }

  splitScreen(): void {
    this.homeState.split();
  }

  updateSplitPart(issue: Issue, splitPart: 'A' | 'B'): void {
    issue.splitPart = splitPart;
    this.homeState.updateIssue(issue);
  }

  updateIssue(number: number) {
    this.homeState.updateIssue(this.homeState.getIssue(number));
  }

  openIssueDetailsSplited(issue: Issue, splitPart: 'A' | 'B'): void {
    issue.details = true;
    issue.splitPart = splitPart;
    this.homeState.updateIssue(issue);
  }
}
