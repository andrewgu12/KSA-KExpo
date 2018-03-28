import * as express from "express";
const db = require("../db/connection");
import Audience from "../public/js/components/audience/audience";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM member", (err: Error, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, response: queryRes.rows});
    }
  });
});

router.get("/user-info", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM member WHERE username = $1 LIMIT 1", [req.query.username], (err: Error, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else if (queryRes.rows.length == 0) { // empty response
      res.send({code: 404, err: "Empty!"});
    } else {
      res.send({code: 200, response: queryRes.rows[0]});
    }
  });
});

router.post("/enter", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("INSERT INTO member(admin, username, performances) VALUES($1, $2, $3)", [false, req.body.username, "{}"], (err: Error, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, response: queryRes.rows});
    }
  });
});

// // TODO: update user's vote for performance

export = router;
