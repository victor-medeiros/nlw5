import { response } from "express";
import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingRepository } from "../repositories/SettingRepository";

interface SettingCreation {
  username: string;
  chat: boolean;
}

class SettingService {
  private settingRepository: Repository<Setting>;

  constructor () {
    this.settingRepository = getCustomRepository(SettingRepository);
  }

  async create({ username, chat }: SettingCreation) {
    const userAlreadyExists = await this.settingRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const setting = this.settingRepository.create({
      username,
      chat
    });

    await this.settingRepository.save(setting);
    return setting;
  }

  async findByUsername(username: string) {
    const setting = this.settingRepository.findOne({ username });

    return setting;
  }

  async update(username: string, chat: boolean) {
    const user = this.settingRepository.update({ username }, { chat });

    return user;
  }
}

export { SettingService };
