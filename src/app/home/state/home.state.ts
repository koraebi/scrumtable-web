import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Issue } from '../model/issue.model';

@Injectable()
export class HomeState {
  private issues = new BehaviorSubject<Issue[]>([]);
  private splited = new BehaviorSubject<boolean>(false);
  private reversed = new BehaviorSubject<boolean>(false);

  getIssues$(): Observable<Issue[]> {
    return this.issues.asObservable();
  }

  setIssues(issues: Issue[]): void {
    this.issues.next(issues);
  }

  updateIssue(issue: Issue): void {
    const values = this.issues.getValue();
    const index = values.findIndex((value) => value.name == issue.name);
    values[index] = issue;
    this.issues.next(values);
  }

  isSplited$(): Observable<boolean> {
    return this.splited.asObservable();
  }

  setSplited(splited: boolean): void {
    this.splited.next(splited);
  }

  isReversed$(): Observable<boolean> {
    return this.reversed.asObservable();
  }

  reverse(): void {
    this.reversed.next(!this.reversed.getValue());
  }
}
