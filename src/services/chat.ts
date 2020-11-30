import { Chat } from "../models/chat";
import { User } from "../models/user";
import { Room } from "../models/room";
import { ChatRequestDTO } from "../interfaces/chat";

export const chat = async (req: ChatRequestDTO) => {
  await Chat.create({
    id: 1,
    roomId: req.roomId,
    userEmail: req.userEmail,
    message: req.message,
  });
};

export const dummy = async () => {
  await User.findOne();
  await Room.findOne();
};
