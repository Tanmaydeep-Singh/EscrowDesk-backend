import { Request, Response } from "express";
import Users from "../../models/Users/Users";


export const loginWithWallet = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ error: "Wallet address required" });

  let user = await Users.findOne({ walletAddress });

  // If user does not exist → create
  if (!user) {
    user = await Users.create({
      walletAddress,
      role: "client", // default role
      projects: [],
      clients: [],
    });
  }

  // Generate JWT

  res.json({ user });
};

/**
 * Get profile
 */
export const getProfile = async (req: any, res: Response) => {
  const user = await Users.findById(req.user.id).populate("projects clients");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
