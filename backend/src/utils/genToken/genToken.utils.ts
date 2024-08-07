import jwt, {SignOptions} from "jsonwebtoken"

const genTokenUtils = (payload: Record<string, any>, expiresIn: SignOptions["expiresIn"]) =>
    jwt.sign(payload, "JWT_SECRET", {expiresIn});

export default genTokenUtils;
