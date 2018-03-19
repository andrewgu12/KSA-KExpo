/**
 * Results page - admin panel
 */
import * as express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("/results\n");
});

export = router;
