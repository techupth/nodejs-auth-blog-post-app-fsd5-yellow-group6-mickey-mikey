import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please send me a JWT token",
    });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (error, payload) => {
    if (error) {
      return res.status(401).json({
        message: "JWT token is invalid",
      });
    }
    req.user = payload;
    next();
  });
};
