import * as express from "express";
const db = require("../db/connection");

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", {title: "Control Panel | KSA KExpo"});
});

router.get("/enter", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", {title: "Enter Competitors | KSA KExpo"});
});

export = router;