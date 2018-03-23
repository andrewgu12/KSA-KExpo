import * as express from "express";
const router = express.Router();

const db = require("../db/connection");
import Performance from "../public/js/components/performances/performance";

const perSort = (a: Performance, b: Performance) => {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;

  return 0;
};

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM performance", (err: any, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      const sortedPerformances = queryRes.rows;
      sortedPerformances.sort(perSort);
      res.send({code: 200, response: sortedPerformances});
    }
  });
});

router.post("/enter", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("INSERT INTO performance(name, approval) VALUES($1, $2)", [req.body.name, 0], (err: any, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      db.query("INSERT INTO permissions(name, category, enabled) VALUES($1, $2, $3)", [req.body.name, "p", false], (err: any, permRes: any) => {
        if (err) {
          res.send({code: 400, err: err});
        } else {
          res.send({code: 200, query: queryRes.rows});
        }
      });
    }
  });
});

router.delete("/delete", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("DELETE FROM performance WHERE id=$1", [parseInt(req.query.id)], (err: any, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, query: queryRes});
    }
  });
});

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("UPDATE permissions SET enabled = $1 WHERE name = $2", [req.body.enabled, req.body.name], (err: Error, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({ code: 400, err: err });
    } else {
      res.send({ code: 200, query: queryRes });
    }
  });
});
export = router;
