/**
 * Home Page - for users
 */
import * as express from "express";
const db = require("../db/connection");

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("frontend", {title: "UMCP KSA KExpo"});
});

export = router;
