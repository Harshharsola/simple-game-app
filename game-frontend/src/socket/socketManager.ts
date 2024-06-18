// socketManager.ts
import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: SocketManager;
  private socket: Socket;

  private constructor() {
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public connect(): void {
    this.socket.connect();
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public on(event: string, callback: any): void {
    this.socket.on(event, callback);
  }

  public off(event: string, callback?: any): void {
    this.socket.off(event, callback);
  }

  public emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }
}

export default SocketManager;
