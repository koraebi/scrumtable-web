import { NgModule } from "@angular/core";
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeFacade } from "./home.facade";
import { IssueComponent } from './components/issue/issue.component';
import { SharedModule } from "../shared/shared.module";
import { HomeState } from "./state/home.state";

import {DragDropModule} from '@angular/cdk/drag-drop';
import { IssueListComponent } from './containers/issue-list/issue-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import { DetailsComponent } from './containers/details/details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MaterialModule} from "../shared/modules/material/material.module";
import { MiniIssueComponent } from './components/mini-issue/mini-issue.component';
import { DetailsIssueComponent } from './components/details-issue/details-issue.component';
import { DraggableDirective } from "./utils/draggableDirective";
import { DroppableDirective } from "./utils/droppableDirective";
import { PopoverModule, WavesModule } from 'angular-bootstrap-md';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [HomeRoutingModule, SharedModule, DragDropModule, MatTooltipModule, NgxPaginationModule, MatGridListModule, MaterialModule, PopoverModule, NgbModule,WavesModule],
    declarations: [
        HomeComponent,
        IssueComponent,
        IssueListComponent,
        DetailsComponent,
        MiniIssueComponent,
        DetailsIssueComponent,
        DraggableDirective,
        DroppableDirective,
    ],
    providers: [HomeFacade, HomeState]
})
export class HomeModule { }
