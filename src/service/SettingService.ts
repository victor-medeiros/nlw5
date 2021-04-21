import { response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";

interface SettingCreation {
  username: string;
  chat: boolean;
}

class SettingService {
  async create({ username, chat }: SettingCreation) {
    const settingRepository = getCustomRepository(SettingRepository);

    const userAlreadyExists = await settingRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const setting = settingRepository.create({
      username,
      chat
    });

    await settingRepository.save(setting); 
    return setting;  
  }
}

export { SettingService };