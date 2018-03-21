/**
 * Results page - admin panel
 */
import * as express from "express";
const db = require("../db/connection");

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", {title: "Admin Control Panel | KSA KExpo"});
});

export = router;
