import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

interface UserCreation {
  email: string
}

class UserService {
  // private userRepository: Repository<User>;

  // constructor () {
  //   this.userRepository = getCustomRepository(UserRepository);
  // }

  async create({ email }: UserCreation){
    // const userExists = await this.userRepository.findOne({ email });
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findOne({ email });

    if (userExists) {
      return userExists;
    }

    const user = userRepository.create({ email });

    await userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = userRepository.findOne({ email });

    return user;
  }
}

export { UserService }
