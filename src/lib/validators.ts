import { string, z } from "zod";

// IN COMING MESSAGES
export enum TypesOfSupportedIncomingMessages {
  JoinRoom = "JOIN_ROOM",
  SendMessage = "SEND_MESSAGE",
}

export const InitMessageSchema = z.object({
  donorId: z.string().optional(),
  applicantId: z.string().optional(),
  roomId: z.string().optional(),
});

export const AddMessageSchema = z.object({
  roomId: z.string(),
  senderId: z.string(),
  message: z.string(),
});

// OUT GOING MESSAGES
export enum TypesOfOutgoingMessages {
  AddChat = "ADD_CHAT",
}

export const OutgoingMessageSchema = z.object({
  // id: z.string(),
  message: z.string(),
  senderId: z.string(),
});
