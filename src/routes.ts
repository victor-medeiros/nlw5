import { Request, Response, Router } from "express";
import { SettingController } from "./controller/SettingController";
import { UserController } from "./controller/UserController";


const route = Router();

const settingController = new SettingController();
const userController = new UserController();

route.post("/settings", settingController.create);
route.post("/users", userController.create);

export { route };
