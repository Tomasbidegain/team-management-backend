import { Router } from "express";
import validatorMiddleware from "../middlewares/validator.middleware";
import { PostProjectDTO, PutProjectDTO } from "../validators/project.validator";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/project.controller";

const router = Router();

router.post(
  "/create",
  validatorMiddleware(PostProjectDTO),
  createProject
);

router.put(
  "/:id",
  validatorMiddleware(PutProjectDTO),
  updateProject
)

router.delete(
  "/:id",
  validatorMiddleware(null),
  deleteProject
)

router.get(
  "/:id",
  validatorMiddleware(null),
  getProject
)

router.get(
  "",
  validatorMiddleware(null),
  getAllProjects
)

export default router;
