import {Router} from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refreshToken);
router.post("/verify", AuthController.verifyEmail);
router.post("/reset-password", AuthController.resetPassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/change-password", AuthController.changePassword);
router.post("/update-profile", AuthController.updateProfile);
router.post("/delete-account", AuthController.deleteAccount);

export default router;