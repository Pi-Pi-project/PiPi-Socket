import { Chat } from "../models/chat";
import { mkId } from "../utils/uuid";
import { ChatRequestDTO } from "../interfaces/chat";

export const chat = async (req: ChatRequestDTO) => {
  const id: string = await mkId();
  await Chat.create({
    id,
    roomId: req.roomId,
    userEmail: req.userEmail,
    message: req.message,
  });
};
