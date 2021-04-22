import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionRepository";

interface ConnectionCreation {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor () {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }
  async create({ socket_id, user_id, admin_id, id }: ConnectionCreation) {
    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    // const connectionRepository = getCustomRepository(ConnectionRepository);
    const connection = await this.connectionRepository.findOne({ user_id });

    return connection;
  }
}

export { ConnectionService }
