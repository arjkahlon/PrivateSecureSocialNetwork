import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { login, followUser, getUser } from "../controllers/user.js";

router.get("/:id", getUser);

router.post("/login", login);
router.post("/follow", auth, followUser);

export default router;