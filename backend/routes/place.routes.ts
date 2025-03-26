import {Router} from "express";
import PlaceController from "../controllers/place.controller";

const router = Router();

router.get("/", PlaceController.getAllPlaces);
router.get("/:id", PlaceController.getPlaceById);
router.post("/", PlaceController.createPlace);
router.put("/:id", PlaceController.updatePlace);
router.delete("/:id", PlaceController.deletePlace);

export default router;