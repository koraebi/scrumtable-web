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

  sendMessage(event:string, message: string): void {
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
          issues.filter((issue) => issue.moscow === undefined && !issue.details)
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

  getDetailsIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(map((issues) => issues.filter((issue) => issue.details)));
  }

  openIssueDetails(issue: Issue): void {
    issue.details = true;
    this.homeState.updateIssue(issue);
  }

  closeIssueDetails(issue: Issue): void {
    issue.details = false;
    this.homeState.updateIssue(issue);
  }

  addMoscowLabel(issue: Issue, moscow: Moscow): void {
    // add the new moscow label
    issue.moscow =  moscow;
    this.homeState.updateIssue(issue)
    this.issuesAPI.addLabelToIssue(issue, moscow).subscribe(
      // then update state
      (resultIssue) => {}
    );
  }

  removeMoscowLabel(issue: Issue): void {
    // remove the current moscow label
    this.issuesAPI.removeLabelToIssue(issue, issue.moscow as Moscow).subscribe(
      // then update state
      (resultIssue) => {}
    );
    issue.moscow = undefined;
    this.homeState.updateIssue(issue);
  }

  changeMoscowLabel(issue: Issue, moscow: Moscow): void {
    this.issuesAPI
      .removeLabelToIssue(issue, issue.moscow as Moscow)
      .subscribe((resultIssue) =>
        this.issuesAPI
          .addLabelToIssue(resultIssue, moscow)
          .subscribe((finalIssue) => {})
      );
    issue.moscow = moscow;
    this.homeState.updateIssue(issue);
  }

  lockIssue(issue: Issue) {
    issue.selected = !issue.selected;
    this.homeState.updateIssue(issue);
  }
}
