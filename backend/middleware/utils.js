import { validationResult } from "express-validator";


export const validationResponse = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json({
        status: "failed",
        messageID: 401,
        message: error.array()
      });
    } else {
      next();
    }
  }