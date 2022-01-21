import { NgModule } from "@angular/core";
import { HomeComponent } from './containers/home/home.component';
import { HomeRoutingModule } from "./home-routing.module";
import { HomeFacade } from "./home.facade";
import { IssueComponent } from './components/issue/issue.component';
import { SharedModule } from "../shared/shared.module";
import { HomeState } from "./state/home.state";

@NgModule({
    imports: [HomeRoutingModule, SharedModule],
    declarations: [
        HomeComponent,
        IssueComponent
    ],
    providers: [HomeFacade, HomeState]
})
export class HomeModule { }