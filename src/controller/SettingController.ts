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
}

export { SettingController };