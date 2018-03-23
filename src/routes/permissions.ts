import * as express from "express";
const router = express.Router();
import axios from "axios";

const db = require("../db/connection");

router.get("/performances", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM permissions WHERE category = $1", ["p"], (err: Error, perfRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, response: perfRes.rows});
    }
  });
});

export = router;
