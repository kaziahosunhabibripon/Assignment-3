import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../user/user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.createUser
);
router.post(
  "/login",
  auth(USER_ROLE.admin),
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
