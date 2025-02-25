import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import validatorMiddleware from "../middlewares/validator.middleware";
import { PostLoginDTO, PostRegisterDTO } from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  validatorMiddleware(PostRegisterDTO),
  registerUser
);

router.post(
  "/login",
  validatorMiddleware(PostLoginDTO),
  loginUser
);

export default router;
