import axios from "axios";
import { NextFunction, Request, Response } from "express";

import { configs } from "../config";

class ReCaptchaMiddleware {
  public async recaptchaMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const recaptchaResponse = req.body.recaptchaResponse;
    if (!recaptchaResponse) {
      return res.status(400).json({ error: "reCAPTCHA не вказана" });
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${configs.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;

    axios
      .post(verifyUrl)
      .then((response) => {
        if (response.data.success) {
          next();
        } else {
          res.status(403).json({ error: "Помилка перевірки reCAPTCHA" });
        }
      })
      .catch((error) => {
        console.error("Помилка перевірки reCAPTCHA:", error);
        res.status(500).json({ error: "Помилка перевірки reCAPTCHA" });
      });
  }
}

export const reCaptchaMiddleware = new ReCaptchaMiddleware();
