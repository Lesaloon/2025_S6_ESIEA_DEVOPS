import {Router} from "express";
import BusinessController from "../controllers/business.controller";

const router = Router();

router.get("/", BusinessController.getAllBusinesses);
router.get("/:id", BusinessController.getBusinessById);
router.post("/", BusinessController.createBusiness);
router.put("/:id", BusinessController.updateBusiness);
router.delete("/:id", BusinessController.deleteBusiness);

export default router;