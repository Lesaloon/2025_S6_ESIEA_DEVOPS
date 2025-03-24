import {Router} from "express";
import PlaceController from "../controllers/place.controller.ts";

const router = Router();

router.get("/", PlaceController.getAllPlaces);
router.get("/:id", PlaceController.getPlaceById);
router.post("/", PlaceController.createPlace);
router.put("/:id", PlaceController.updatePlace);
router.delete("/:id", PlaceController.deletePlace);
router.get("/user/:userId", PlaceController.getPlacesByUserId);
router.get("/category/:category", PlaceController.getPlacesByCategory);
router.get("/location", PlaceController.getPlacesByLocation);
router.get("/search", PlaceController.searchPlaces);

export default router;