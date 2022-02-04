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

     public sendMessage(message: string): void {
        if (this.socket) {
          this.socket.emit('msgToMobile', message);
          
    }}

    public sendUpdateMessage(t:string, m:string): void {
      if (this.socket) this.socket.emit('msgToMobile', {type: t, text: m});
    }

    public getMessage = () => {
      if (this.socket)
        this.socket.on('msgFromMobile', (message) => {
            this.message$.next(message);
            console.log(message);
        });

        return this.message$.asObservable();
    };

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
