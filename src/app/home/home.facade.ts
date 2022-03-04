import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IssueAPI } from '../core/api/issues.api';
import { Moscow } from './enum/moscow.enum';
import { Issue } from './model/issue.model';
import { SocketService } from '../core/services/socket.service';
import { HomeState } from './state/home.state';

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

  loadIssues() {
    this.issuesAPI
      .getIssues()
      .subscribe((issues) => this.homeState.setIssues(issues));
  }

  getAvailableIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(
        map((issues) =>
          issues.filter((issue) => issue.moscow === Moscow.TODO && !issue.details)
        )
      );
  }

  getMustIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(
        map((issues) =>
          issues.filter(
            (issue) => issue.moscow === Moscow.MUST && !issue.details
          )
        )
      );
  }

  getShouldIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(
        map((issues) =>
          issues.filter(
            (issue) => issue.moscow === Moscow.SHOULD && !issue.details
          )
        )
      );
  }

  getCouldIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(
        map((issues) =>
          issues.filter(
            (issue) => issue.moscow === Moscow.COULD && !issue.details
          )
        )
      );
  }

  getWontIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(
        map((issues) =>
          issues.filter(
            (issue) => issue.moscow === Moscow.WONT && !issue.details
          )
        )
      );
  }

  getDetailsIssues$(side : String): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(map((issues) => issues.filter((issue) => issue.details && issue.side === side)));
  }

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

  addMoscowLabel(issue: Issue, moscow: Moscow): void {
    // add the new moscow label
    issue.moscow = moscow;
    this.homeState.updateIssue(issue);
    this.issuesAPI.addLabelToIssue(issue, moscow).subscribe(
      // then update state
      (resultIssue) => {}
    );
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

  updateIssue(number: number, newLabel: String) {
    let issue = this.homeState.getIssue(number);
    issue.moscow = newLabel as Moscow;
    this.homeState.updateIssue(issue);
  }
}
