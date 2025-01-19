import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessageType } from "./lib/types";
import {
  TypesOfOutgoingMessages,
  TypesOfSupportedIncomingMessages,
} from "./lib/validators";
import { generateRoomId } from "./lib/utils";
import { RoomManager } from "./RoomManager";

const roomManager = new RoomManager();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    // TODO: add rate limitting logic here
    try {
      messageHandler(ws, JSON.parse(data.toString()));
      console.log("within the index.js ::: input message ", data.toString());
    } catch (error) {
      console.error(error);
    }
  });

  ws.send("something");
});

const messageHandler = (socket: WebSocket, message: IncomingMessageType) => {
  if (message.type === TypesOfSupportedIncomingMessages.JoinRoom) {
    const payload = message.payload;
    if (payload.roomId) {
      roomManager.addUser(payload.roomId, socket);
    } else if (payload.donorId && payload.applicantId) {
      const roomId = generateRoomId(payload.donorId, payload.applicantId);
      roomManager.addUser(roomId, socket);
    } else {
      console.error("Incorrect message type");
    }
  } else if (message.type === TypesOfSupportedIncomingMessages.SendMessage) {
    const payload = message.payload;
    const outgoingMessage = {
      type: TypesOfOutgoingMessages.AddChat,
      payload: { message: payload.message, senderId: payload.senderId },
    };
    roomManager.broadcast(payload.roomId, outgoingMessage);
  }
};
