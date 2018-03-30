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
  let fileName = req.body.name.toLowerCase().replace(/ /g, "_");
  fileName += ".jpg";
  db.query("INSERT INTO performance(name, approval, imageName) VALUES($1, $2, $3)", [req.body.name, 0, fileName], (err: any, queryRes: any) => {
    if (err) {
      console.log(err);
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, query: queryRes.rows});
    }
  });
});

router.post("/enter-multiple", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const performances = req.body.performances;

  // this is only used for final calculation, so ok to just insert 0 for values
  performances.forEach((perf: Performance) => {
    db.query("INSERT INTO finalperformance(name, approval) VALUES($1, $2)", [perf.name, 0], (err: any, queryRes: any) => {
      if (err) {
        console.log(err);
        res.send({code: 400, err: err});
      } else {
        console.log("success!");
      }
    });
  });
  res.send({code: 200, res: "success!"});
});

router.get("/get-final", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM finalperformance LIMIT 3", (err: Error, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      const sortedPerformances = queryRes.rows.sort(perSort);
      res.send({code: 200, response: sortedPerformances});
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

router.post("/vote", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const direction = (req.body.direction === "increment") ? 1 : -1;
  db.query("UPDATE performance SET approval = approval + $1 WHERE name = $2", [direction, req.body.name], (err: Error, queryRes: any) => {
    if (err) {
      res.send({ code: 400, err: err});
    } else {
      res.send({ code: 200, message: "success!"});
    }
  });
});

router.post("/final/vote", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const vote = req.body.name;

  db.query("UPDATE finalPerformance SET approval = approval + 1 WHERE name = $1", [vote], (err: Error, queryRes: any) => {
    if (err) {
      res.send({ code: 400, err: err });
    } else {
      res.send({ code: 200, message: "success!"});
    }
  });
});

export = router;
