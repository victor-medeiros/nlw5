import { Request, Response, Router } from "express";
import { MessageController } from "./controller/MessageController";
import { SettingController } from "./controller/SettingController";
import { UserController } from "./controller/UserController";


const route = Router();

const settingController = new SettingController();
const userController = new UserController();
const messageController = new MessageController();

route.post("/settings", settingController.create);
route.get("/settings/:username", settingController.findByUsername);
route.put("/settings/:username", settingController.update);

route.post("/users", userController.create);

route.post("/messages", messageController.create);
route.get("/messages/:id", messageController.showMessageByUser);

export { route };
