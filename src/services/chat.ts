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

export const updateRecentlyRoom = async (id: number) => {
  const date = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  await Room.update({ updatedAt: date }, { where: { id } });
};
