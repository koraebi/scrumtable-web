import { NgModule } from "@angular/core";
import { SocketService } from "./services/socket.service";
import { HttpClientModule } from '@angular/common/http';
import { IssueAPI } from "./api/issues.api";
import {SocketIoModule} from "ngx-socket-io";

@NgModule({
    imports: [HttpClientModule, SocketIoModule],
    providers: [SocketService, IssueAPI]
})
export class CoreModule { }
