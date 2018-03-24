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

router.post("/flip-flag", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  db.query("UPDATE permissions SET enabled = $1 WHERE name = $2", [req.body.value, req.body.name], (err: Error, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({ code: 400, err: err });
    } else {
      res.send({ code: 200, query: queryRes });
    }
  });
});

export = router;
