import * as express from "express";
const router = express.Router();

const db = require("../db/connection");

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("make query");
  db.query("SELECT * FROM performance", (err: any, queryRes: any) => {
    console.log("finished query");
    if (err) {
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, response: queryRes.rows});
    }
  });
});

router.post("/enter", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("INSERT INTO performance(name, approval, enabled) VALUES($1, $2, $3)", [req.body.name, 0, false], (err: any, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      console.log(queryRes);
      res.send({code: 200, query: queryRes.rows});
    }
  });
});

router.delete("/delete", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.log(req);
  console.log(typeof req.query.id);
  db.query("DELETE FROM performance WHERE id=$1", [parseInt(req.query.id)], (err: any, queryRes: any) => {
    console.log("finished delete");
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      console.log(queryRes);
      res.send({code: 200, query: queryRes});
    }
  });
});
export = router;