import jwt from "jsonwebtoken";
import {TOKEN_SECRET_KEY} from "../../config/environment";

const generateToken = (payload: string | Buffer | object, options?: jwt.SignOptions) => jwt.sign(payload, TOKEN_SECRET_KEY, options);

export default generateToken;
