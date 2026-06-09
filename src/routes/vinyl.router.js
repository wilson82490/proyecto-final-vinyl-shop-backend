import { Router } from "express";

import {
  createVinyl,
  updateVinyl,
  getVinyls,
  getVinylById,
  deleteVinyl,
} from "../controllers/vinyl.controller.js";

const router = Router();

// Prefijo: /api/vinyls

router.get("/", getVinyls);
router.get("/:id", getVinylById);
router.post("/", createVinyl);
router.put("/:id", updateVinyl);
router.delete("/:id", deleteVinyl);

export default router;


