import { Chat } from "../models/chat";
import { Room } from "../models/room";
import { ChatRequestDTO } from "../interfaces/chat";

export const chat = async (req: ChatRequestDTO) => {
  await Chat.create({
    roomId: req.roomId,
    userEmail: req.userEmail,
    message: req.message,
  });
};

export const dummy = async () => {
  await Room.findOne();
};
