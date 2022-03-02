import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IssueAPI } from 'src/app/core/api/issues.api';
import { Moscow } from '../enum/moscow.enum';
import { Issue } from '../model/issue.model';
import { HomeState } from '../state/home.state';

@Injectable()
export class MoscowDataFacade {
  constructor(private homeState: HomeState, private issuesAPI: IssueAPI) {}

  loadIssues() {
    this.issuesAPI
      .getIssues()
      .subscribe((issues) => this.homeState.setIssues(issues));
  }

  /*
   * GLOBAL
   */

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

  getDetailsIssues$(): Observable<Issue[]> {
    return this.homeState
      .getIssues$()
      .pipe(map((issues) => issues.filter((issue) => issue.details)));
  }

  /*
   * SPLIT PART A
   */

  getAvailableIssuesPartA$(): Observable<Issue[]> {
    return this.getAvailableIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  getMustIssuesPartA$(): Observable<Issue[]> {
    return this.getMustIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  getShouldIssuesPartA$(): Observable<Issue[]> {
    return this.getShouldIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  getCouldIssuesPartA$(): Observable<Issue[]> {
    return this.getCouldIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  getWontIssuesPartA$(): Observable<Issue[]> {
    return this.getWontIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  getDetailsIssuesPartA$(): Observable<Issue[]> {
    return this.getDetailsIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'A'))
    );
  }

  /*
   * SPLIT PART B
   */

  getAvailableIssuesPartB$(): Observable<Issue[]> {
    return this.getAvailableIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }

  getMustIssuesPartB$(): Observable<Issue[]> {
    return this.getMustIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }

  getShouldIssuesPartB$(): Observable<Issue[]> {
    return this.getShouldIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }

  getCouldIssuesPartB$(): Observable<Issue[]> {
    return this.getCouldIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }

  getWontIssuesPartB$(): Observable<Issue[]> {
    return this.getWontIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }

  getDetailsIssuesPartB$(): Observable<Issue[]> {
    return this.getDetailsIssues$().pipe(
      map((issues) => issues.filter((issue) => issue.splitPart === 'B'))
    );
  }
}
