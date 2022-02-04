import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IssueAPI } from "../core/api/issues.api";
import { Moscow } from "./enum/moscow.enum";
import { Issue } from "./model/issue.model";
import { SocketService } from "../core/services/socket.service";
import { HomeState } from "./state/home.state";

@Injectable()
export class HomeFacade {
    constructor(private socketService: SocketService, private homeState: HomeState, private issuesAPI: IssueAPI) { }

    // Socket

    getMessage$(): Observable<string> {
        return this.socketService.getMessage();
    }

    sendMessage(message: string): void {
        this.socketService.sendMessage(message);
    }

    // Issues

    loadIssues() {
        this.issuesAPI.getIssues().subscribe(issues => this.homeState.setIssues(issues));
    }

    getAvailableIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$().pipe(map(issues => issues.filter(issue => issue.moscow === undefined)));
    }

    getMustIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$().pipe(map(issues => issues.filter(issue => issue.moscow === Moscow.MUST)));
    }

    getShouldIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$().pipe(map(issues => issues.filter(issue => issue.moscow === Moscow.SHOULD)));
    }

    getCouldIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$().pipe(map(issues => issues.filter(issue => issue.moscow === Moscow.COULD)));
    }

    getWontIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$().pipe(map(issues => issues.filter(issue => issue.moscow === Moscow.WONT)));
    }

    transferIssue(from: string, to: string, issue: Issue) {
        // if we have to set a moscow label
        if(to !== 'Available')
            // updateAPI
            this.issuesAPI.addLabelToIssue(issue, to as Moscow).subscribe(
                // then update state
                (resultIssue) => this.homeState.updateIssue(resultIssue)
            );
        // else if have to remove the label
        else
            // updateAPI
            this.issuesAPI.removeLabelToIssue(issue, from as Moscow).subscribe(
                // then update state
                (resultIssue) => this.homeState.updateIssue(resultIssue)
            )
    }

}
