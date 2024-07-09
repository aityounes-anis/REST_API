import express from "express";

import { createUser, getUserByEmail } from "actions/users";
import { authentication, random } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) res.sendStatus(400);

    const existingUser = await getUserByEmail(email);

    if (existingUser) res.sendStatus(400);

    const salt = random();

    const user = await createUser({
      username,
      email,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
  }
};
