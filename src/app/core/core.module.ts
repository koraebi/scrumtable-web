import { NgModule } from "@angular/core";
import { SocketService } from "./services/socket.service";
import { HttpClientModule } from '@angular/common/http';
import { IssueAPI } from "./api/issues.api";

@NgModule({
    imports: [HttpClientModule],
    providers: [SocketService, IssueAPI]
})
export class CoreModule { }
