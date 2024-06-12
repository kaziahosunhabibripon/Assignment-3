import { AnyZodObject, Schema } from "zod";
import catchAsync from "../modules/utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
