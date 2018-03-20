/**
 * Home Page - for users
 */
import * as express from "express";
const db = require("../db/connection");

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", {title: "Hello World!"});
});

export = router;
