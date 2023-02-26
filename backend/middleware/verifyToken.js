import jwt from "jsonwebtoken";
const config = require("../config/config").get(process.env.NODE_ENV);
const { secret } = config;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    let jwtSecretKey = secret.jwt;
    if (!token)
      return res.json({
        status: 400,
        messageID: 400,
        message: "Invalid Token",
        data: err,
      });
    const decode = jwt.verify(token, jwtSecretKey);
    req.user = decode;
    if (!(req.user.role === 0)) {
      res.json({
        status: 400,
        messageID: 400,
        message: "You are not admin",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    if (error.name == "TokenExpiredError") {
      res.json({
        status: 400,
        messageID: 400,
        message: "Token Expire",
        data: err,
      });
    }
    res.json({
      status: 500,
      messageID: 500,
      message: "Internal Server Error",
    });
  }
};
