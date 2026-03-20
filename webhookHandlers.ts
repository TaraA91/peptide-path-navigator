import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import usersRouter from "./users.js";
import stripeRouter from "./stripe.js";
import waitlistRouter from "./waitlist.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(usersRouter);
router.use(stripeRouter);
router.use(waitlistRouter);

export default router;
