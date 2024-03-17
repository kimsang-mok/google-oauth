import express from "express";
import { googleOauthHandler } from "./controllers/session.controller";

const router = express.Router();

router.get("/auth/google", googleOauthHandler);

export default router;
