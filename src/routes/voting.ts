import * as express from "express";

const db     = require("../db/connection");
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send({code: 200});
});

router.get("/subtractOne", (req: express.Request, res: express.Response, next: express.NextFunction) => {

});

// TODO: add a vote

export = router;
