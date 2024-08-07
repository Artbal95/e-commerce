import express from "express";
import validationMiddleware from "../../middlewares/validation";
import {register} from "../../controllers/auth";
import {RegisterSchema} from "../../schema/auth";

const router = express.Router();

router.post("/signup", validationMiddleware(RegisterSchema), register);/*
router.post("/signin", validationMiddleware(SigninSchema), signin); */

export default router;
