import * as express from "express";
const router = express.Router();

const db = require("../db/connection");

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("make query");
  db.query("SELECT * FROM performance", (err, queryRes) => {
    console.log("finished query");
    if (err) {
      res.send({code: 400, err: err});
    } else {
      res.send({code: 200, query: queryRes});
    }
  });
});

router.post("/enter", (req: express.Request, res: express.Response, next: express.NextFunction) => {

});

export = router;