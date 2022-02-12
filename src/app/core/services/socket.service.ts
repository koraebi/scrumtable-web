import { Injectable } from "@angular/core";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {BehaviorSubject} from "rxjs";
import {io, Socket} from "socket.io-client";
import {environment} from "../../../environments/environment";

@Injectable()
export class SocketService {
  private message$: BehaviorSubject<string> = new BehaviorSubject('');
  private socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;

  constructor() { }

  setupSocketConnection(){
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

   public sendMessage(event: string, message: string): void {
      if (this.socket) {
        this.socket.emit(event, message);
      }
  }

  public getMessage = () => {
    if (this.socket) {
      this.socket.on('updateWebIssues', (message) => {
        window.location.reload();
        alert('update');
      });
    }
  };

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
