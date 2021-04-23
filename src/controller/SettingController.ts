import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";
import { SettingService } from "../service/SettingService";

class SettingController {
  async create(request: Request, response: Response) {
    const { username, chat } = request.body;

    const settingService = new SettingService();

    try {
      const setting = await settingService.create({
        username,
        chat
      });

      return response.status(201).json();
    } catch (error) {
      return response.status(400).json({
        message: error.message
      });
    }
  }

  async findByUsername(request: Request, response: Response){
    const { username } = request.params;

    const settingService = new SettingService();

    const setting = await settingService.findByUsername(username);

    return response.status(200).json(setting);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const  { chat } = request.body;

    const settingService = new SettingService();

    const user = await settingService.update(username, chat);

    return response.status(200).json(user);
  }
}

export { SettingController };
