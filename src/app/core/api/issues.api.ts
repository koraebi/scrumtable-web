import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Moscow } from "src/app/home/enum/moscow.enum";
import { Issue } from "../../home/model/issue.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class IssueAPI {
    readonly API = environment.API_ENDPOINT;

    constructor(private http: HttpClient) { }

    getIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(this.API);
    }

    addLabelToIssue(issue: Issue, label: Moscow): Observable<Issue> {
        return this.http.post<string[]>(this.API + '/' + issue.number, {label: label}).pipe(map((result) => new Issue(issue.number, issue.name, issue.description, issue.assignee, issue.assignees, issue.selected,
            result.length === 0 ? undefined : result[0] as Moscow
            )));
    }

    removeLabelToIssue(issue: Issue, label: Moscow): Observable<Issue> {
        return this.http.delete<string[]>(this.API + '/' + issue.number + '/' + label).pipe(map((result) => new Issue(issue.number, issue.name,issue.description,issue.assignee, issue.assignees, issue.selected,
            result.length === 0 ? undefined : result[0] as Moscow
            )));
    }
}
