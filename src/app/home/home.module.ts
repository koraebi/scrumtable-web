import { NgModule } from "@angular/core";
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeFacade } from "./home.facade";
import { IssueComponent } from './components/issue/issue.component';
import { SharedModule } from "../shared/shared.module";
import { HomeState } from "./state/home.state";

import {DragDropModule} from '@angular/cdk/drag-drop';
import { IssueListComponent } from './containers/issue-list/issue-list.component';

@NgModule({
    imports: [HomeRoutingModule, SharedModule, DragDropModule],
    declarations: [
        HomeComponent,
        IssueComponent,
        IssueListComponent
    ],
    providers: [HomeFacade, HomeState]
})
export class HomeModule { }