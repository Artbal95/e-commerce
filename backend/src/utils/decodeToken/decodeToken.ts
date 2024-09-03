import jwt from "jsonwebtoken";

const decodeToken = (token: string) => jwt.decode(token);

export default decodeToken;
