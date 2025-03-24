import { Router } from "express";
import ReviewController from "../controllers/review.controller";

const router = Router();

router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.post("/", ReviewController.createReview);
router.put("/:id", ReviewController.updateReview);

export default router;