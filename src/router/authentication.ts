import express from "express";

import { login } from "../controllers/authentication";
import { register } from "../controllers/authentication";

export default (router: express.Router) => {
  router.get("/auth/login", login);
  router.post("/auth/register", register);
};
