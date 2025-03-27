import {Router} from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh", AuthController.refreshToken);
router.post("/reset-password", AuthController.resetPassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/change-password", AuthController.changePassword);
router.post("/update-profile", AuthController.updateProfile);
router.post("/delete-account", AuthController.deleteAccount);
router.get("/profile", AuthController.getProfile);

export default router;