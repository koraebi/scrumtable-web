import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Issue } from "../../home/model/issue.model";

@Injectable()
export class IssueAPI {
    readonly API = 'http://localhost:3000/issues';

    constructor(private http: HttpClient) { }

    getIssues(): Observable<Issue[]> {
        return this.http.get<Issue[]>(this.API);
    }
}
