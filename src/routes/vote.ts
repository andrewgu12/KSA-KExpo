/*
 * Votes page - for audience members
 */
import * as express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("/votes\n");
});

export = router;
