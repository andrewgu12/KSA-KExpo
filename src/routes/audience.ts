import * as express from "express";
const db = require("../db/connection");
import Audience from "../public/js/components/audience/audience";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  db.query("SELECT * FROM member", (err: Error, queryRes: any) => {
    if (err) {
      res.send({code: 400, err: err});
    } else {
      console.log(queryRes.rows);
      res.send({code: 200, response: queryRes.rows});
    }
  }); 
});



export = router;