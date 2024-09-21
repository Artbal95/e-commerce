import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../../config/environment";

const verifyToken = (token: string) => {
  return jwt.verify(token, TOKEN_SECRET_KEY);
};

export default verifyToken;
