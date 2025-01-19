import { z } from "zod";
import {
  AddMessageSchema,
  InitMessageSchema,
  OutgoingMessageSchema,
  TypesOfOutgoingMessages,
  TypesOfSupportedIncomingMessages,
} from "./validators";

export type IncomingMessageType =
  | {
      type: TypesOfSupportedIncomingMessages.JoinRoom;
      payload: z.infer<typeof InitMessageSchema>;
    }
  | {
      type: TypesOfSupportedIncomingMessages.SendMessage;
      payload: z.infer<typeof AddMessageSchema>;
    };

export type OutgoingMessageType = {
  type: TypesOfOutgoingMessages.AddChat;
  payload: z.infer<typeof OutgoingMessageSchema>;
};
