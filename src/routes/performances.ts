import * as express from "express";
const router = express.Router();

const db = require("../db/connection");

interface Performance {
  name: string;
  id: number;
  approval: number;
  enabled: boolean;
}

const perSort = (a: Performance, b: Performance) => {  
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;

  return 0;
};

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("make query");
  db.query("SELECT * FROM performance", (err: any, queryRes: any) => {
    console.log("finished query");
    if (err) {
      res.send({code: 400, err: err});
    } else {
      const sortedPerformances = queryRes.rows;
      sortedPerformances.sort(perSort);
      console.log(sortedPerformances);
      res.send({code: 200, response: sortedPerformances});
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

router.post("/update", (req: express.Request, res: express.Response, next: express.NextFunction) => {    
  db.query("UPDATE performance SET enabled = $1 WHERE id = $2", [req.body.enabled, req.body.id], (err: Error, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({ code: 400, err: err });
    } else {
      console.log(queryRes);
      res.send({ code: 200, query: queryRes });
    }
  });
});
export = router;