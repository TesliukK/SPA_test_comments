import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { Model, ModelCtor } from "sequelize";

import { ApiError } from "../errors";

class CommonMiddleware {
  public isIdValid(
    model: ModelCtor<Model>,
    idField: string,
    from: "params" | "query" = "params",
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req[from][idField] as string;

        if (!id) {
          throw new ApiError("ID is missing", 400);
        }

        const instance = await model.findByPk(id);

        if (!instance) {
          throw new ApiError("Resource not found", 404);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 404);
        }
        Object.assign(req.body, value);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const commonMiddleware = new CommonMiddleware();
