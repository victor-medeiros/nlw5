import { Request, Response, Router } from "express";
import { SettingController } from "./controller/SettingController";


const route = Router();

const settingController = new SettingController();

route.post("/settings", settingController.create);

export { route };