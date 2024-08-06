import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {signup} from "../../controllers/auth";
import {SignupSchema} from "../../schema/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(SignupSchema), signup);/*
router.post("/signin", validationMiddleware(SigninSchema), signin); */

export default router;
