import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessageRepository } from "../repositories/MessageRepository";

interface MessageCreation {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessageService {
  // private messageRepository: Repository<Message>

  // constructor () {
  //   this.messageRepository = getCustomRepository(MessageRepository);
  // }

  async create({ admin_id, user_id, text }: MessageCreation) {
    const messageRepository = getCustomRepository(MessageRepository);
    // const message = this.messageRepository.create({
    const message = messageRepository.create({
      admin_id,
      user_id,
      text
    });

    // await this.messageRepository.save(message);
    await messageRepository.save(message);
    return message;
  }

  async listByUser(user_id: string) {
    const messageRepository = getCustomRepository(MessageRepository);

    // const list = await this.messageRepository.find({
    const list = await messageRepository.find({
      where: { user_id },
      relations: ["user"]
    });

    return list;
  }
}

export { MessageService };
