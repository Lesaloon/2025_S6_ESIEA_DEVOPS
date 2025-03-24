import { Router } from "express";
import UserController from "../controllers/user.controller";

Router.get("all", UserController.getAllUsers);
Router.get("/:id", UserController.getUserById);
Router.post("/", UserController.createUser);


export default Router;