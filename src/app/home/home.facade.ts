import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IssueAPI } from "../core/api/issues.api";
import { Issue } from "../core/model/issue.model";
import { SocketService } from "../core/services/socket.service";
import { HomeState } from "./state/home.state";

@Injectable()
export class HomeFacade {
    constructor(private socketService: SocketService, private homeState: HomeState, private issuesAPI: IssueAPI) { }

    getMessage$(): Observable<string> {
        return this.socketService.getMessage();
    }

    loadIssues() {
        this.issuesAPI.getIssues().subscribe(issues => this.homeState.setIssues(issues));
    }

    sendMessage(message: string): void {
        this.socketService.sendMessage(message);
    }

    getIssues$(): Observable<Issue[]> {
        return this.homeState.getIssues$();
    }

    selectIssue(issue: Issue): void {
        //update api
        // update ui state
        this.homeState.updateIssue(issue);
    }
}