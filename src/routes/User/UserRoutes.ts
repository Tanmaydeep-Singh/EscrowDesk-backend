import { Router } from "express";
import { getProfile, loginWithWallet } from "../../controllers/UserController/UserController";


const router = Router();

/**
 * Login / Signup with wallet
 * If wallet exists → login
 * If wallet does not exist → create user
 */
router.post("/wallet", loginWithWallet);
router.get("/me", getProfile);

export default router;
