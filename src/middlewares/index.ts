import express from "express";

import { getUserBySessionToken } from "../actions/users";

type ExistingUser = express.Request & {
  identity?: Record<string, any>;
};

export const isOwner = async (
  req: ExistingUser,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = req.identity;
    const { id } = req.params;

    if (!user._id) {
      return res.sendStatus(400);
    }

    if (user._id.toString() !== id) {
      return res.sendStatus(401);
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const isAuthenticated = async (
  req: ExistingUser,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["REST-API-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(401);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    req.identity = existingUser;

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
