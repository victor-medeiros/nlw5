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
  // private connectionRepository: Repository<Connection>;

  // constructor () {
  //   this.connectionRepository = getCustomRepository(ConnectionRepository);
  // }
  async create({ socket_id, user_id, admin_id, id }: ConnectionCreation) {
    const connectionRepository = getCustomRepository(ConnectionRepository);
    const connection = connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    });

    await connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connectionRepository = getCustomRepository(ConnectionRepository);
    const connection = await connectionRepository.findOne({ user_id });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connectionRepository = getCustomRepository(ConnectionRepository);
    const allWithoutAdmin = await connectionRepository.find({
      where: { admin_id: null },
      relations: ['user']
    });

    return allWithoutAdmin;
  }

  async findBySokcetId(socket_id: string) {
    const connectionRepository = getCustomRepository(ConnectionRepository);
    const connection = await connectionRepository.findOne({ socket_id });

    return connection;
  }

  async update(user_id: string, admin_id: string) {
    const connectionRepository = getCustomRepository(ConnectionRepository);
    await connectionRepository.update({ user_id }, { admin_id });
  }
}

export { ConnectionService }
