import { NgModule } from '@angular/core';
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeFacade } from './facades/home.facade';
import { MoscowDataFacade } from './facades/moscow-data.facade';
import { IssueComponent } from './components/issue/issue.component';
import { SharedModule } from '../shared/shared.module';
import { HomeState } from './state/home.state';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { IssueListComponent } from './containers/issue-list/issue-list.component';
import { DetailsComponent } from './containers/details/details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialModule } from '../shared/modules/material/material.module';
import { MiniIssueComponent } from './components/mini-issue/mini-issue.component';
import { DetailsIssueComponent } from './components/details-issue/details-issue.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TitleToolbarComponent } from './components/title-toolbar/title-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DraggableDirective } from './directives/drag/draggable.directive';
import { DroppableDirective } from './directives/drop/droppable.directive';
import { WindowComponent } from './components/window/window.component';
import {ButtonModule} from "smart-webcomponents-angular/button";
import {WindowModule} from "smart-webcomponents-angular/window";

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    DragDropModule,
    MatGridListModule,
    MaterialModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ButtonModule,
    WindowModule,
  ],
  declarations: [
    HomeComponent,
    IssueComponent,
    IssueListComponent,
    DetailsComponent,
    MiniIssueComponent,
    DetailsIssueComponent,
    TitleToolbarComponent,
    DraggableDirective,
    DroppableDirective,
    WindowComponent,
  ],
  providers: [HomeFacade, MoscowDataFacade, HomeState],
})
export class HomeModule {}
