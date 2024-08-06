import { validate } from "class-validator";
import {NextFunction, Request, Response} from "express";

type Constructor<T> = new () => T;

const validationMiddleware = <T extends object>(Schema: Constructor<T>) => {
  return async (
    req: Request<{}, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    const user = new Schema();
    Object.assign(user as object, req.body);

    const errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed.",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }

    next();
  };
};

export default validationMiddleware;
