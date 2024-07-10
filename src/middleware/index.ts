import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../actions/users";

export const isAuthenticated = async (
  req: express.Request,
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

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
