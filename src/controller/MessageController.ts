import { Request, Response } from "express";
import { MessageService } from "../service/MessageService";

class MessageController {
  async create(request: Request, response: Response) {
    const { admin_id, user_id, text } = request.body;

    const messageService = new MessageService();

    const message = await messageService.create({
      admin_id,
      user_id,
      text
    });

    return response.status(201).json(message);
  }

  async showMessageByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messageService = new MessageService();

    const list = await messageService.listByUser(id);

    return response.status(list.length == 0 ? 204 : 200).json(list);
  }
}

export { MessageController }
