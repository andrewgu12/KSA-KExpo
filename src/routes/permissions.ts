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

// get value of flag
router.get("/check-flag", (req: express.Request, res: express.Response, next: express.NextFunction) => {  
  db.query("SELECT * FROM permissions WHERE name = $1 LIMIT 1", [req.query.id], (err: Error, flagValue: any) => {
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, value: flagValue.rows[0].enabled});
    }
  });
});

router.post("/flip-flag", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("UPDATE permissions SET enabled = $1 WHERE name = $2", [req.body.value, req.body.name], (err: Error, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({ code: 400, err: err });
    } else {
      res.send({ code: 200, query: queryRes });
    }
  });
});

router.post("/insert", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    db.query("INSERT INTO permissions(name, category, enabled) VALUES($1, $2, $3)", [req.body.name, "p", false], (err: Error, queryRes: any) => {
      if (err) {
        console.log(err);
        res.send({ code: 400, err: err});
      } else {
        res.send({ code: 200, query: queryRes});
      }
    });
});

export = router;
