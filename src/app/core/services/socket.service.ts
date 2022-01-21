import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { io } from "socket.io-client";

@Injectable()
export class SocketService {
    private message$: BehaviorSubject<string> = new BehaviorSubject('');
    private socket = io('http://localhost:3000');

    constructor() { }

    public sendMessage(message: string): void {
        this.socket.emit('message', message);
    }

    public getMessage = () => {
        this.socket.on('message', (message) => {
            this.message$.next(message);
        });

        return this.message$.asObservable();
    };
}