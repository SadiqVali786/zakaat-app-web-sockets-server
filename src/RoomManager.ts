import { WebSocket } from "ws";
import { OutgoingMessageType } from "./lib/types";

export class RoomManager {
  private rooms: Map<string, WebSocket[]>;

  constructor() {
    this.rooms = new Map<string, WebSocket[]>();
  }

  addUser(roomId: string, socket: WebSocket) {
    if (!this.rooms.get(roomId)) {
      this.rooms.set(roomId, []);
    }

    this.rooms.get(roomId)?.push(socket);

    socket.on("close", () => {
      this.removeUser(roomId, socket);
    });
  }

  removeUser(roomId: string, socket: WebSocket) {
    let room = this.rooms.get(roomId);
    if (room) {
      room = room.filter((ws) => ws !== socket);
    }
  }

  broadcast(roomId: string, message: OutgoingMessageType) {
    const room = this.rooms.get(roomId);
    if (!room) {
      console.error("room not found");
      return;
    }

    room.forEach((socket) => {
      socket.send(JSON.stringify(message));
    });
  }
}
