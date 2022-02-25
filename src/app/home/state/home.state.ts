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

  getIssue(number: number): Issue {
    const values = this.issues.getValue();
    const index = values.findIndex((value) => value.number == number);
    return values[index]
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

  split(): void {
    this.splited.next(!this.splited.getValue());
    this.issues.next(
      this.issues.getValue().map((issue) => {
        if (!issue.splitPart) issue.splitPart = 'A';
        return issue;
      })
    );
  }

  isReversed$(): Observable<boolean> {
    return this.reversed.asObservable();
  }

  reverse(): void {
    this.reversed.next(!this.reversed.getValue());
  }
}
