import { NextFunction, Request, Response } from "express";
import { HttpException } from "../handlers/HttpException";
import Errors from "../handlers/ErrorsDictionary";
import { ProjectType } from "../models/ProjectType";
import { ProjectState } from "../models/ProjectState";
import { Project } from "../models/Project";
import { PostProjectDTO } from "../validators/project.validator";
import { RequestWithUser } from "../interfaces/request/IRequestWithUser";
import { Op } from "sequelize";

export const createProject = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, start_date, end_date, state_id, type_id } =
      req.body as PostProjectDTO;

    const existType = await ProjectType.findOne({ where: { id: type_id } });
    if (!existType) throw HttpException(Errors.TYPE_PROJECT_NOT_FOUND);
    const existState = await ProjectState.findOne({ where: { id: state_id } });
    if (!existState) throw HttpException(Errors.STATE_PROJECT_NOT_FOUND);

    if (!name) throw HttpException(Errors.NAME_IS_REQUIRED);
    if (!description) throw HttpException(Errors.DESCRIPTION_IS_REQUIRED);
    if (!start_date) throw HttpException(Errors.START_DATE_IS_REQUIRED);
    if (!state_id) throw HttpException(Errors.STATE_IS_REQUIRED);
    if (!type_id) throw HttpException(Errors.TYPE_IS_REQUIRED);

    await Project.create({
      name,
      description,
      start_date,
      state_id,
      end_date,
      type_id,
      user_id: req.userId as string,
    });

    res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date, state_id, type_id } =
      req.body as PostProjectDTO;

    const existProject = await Project.findOne({ where: { id } });
    if (!existProject) throw HttpException(Errors.PROJECT_NOT_FOUND);

    if (type_id) {
      const existType = await ProjectType.findOne({ where: { id: type_id } });
      if (!existType) throw HttpException(Errors.TYPE_PROJECT_NOT_FOUND);
    }

    if (state_id) {
      const existState = await ProjectState.findOne({
        where: { id: state_id },
      });
      if (!existState) throw HttpException(Errors.STATE_PROJECT_NOT_FOUND);
    }

    // Actualizamos los valores en la instancia
    existProject.set({
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(start_date ? { start_date } : {}),
      ...(state_id ? { state_id } : {}),
      ...(end_date ? { end_date } : {}),
      ...(type_id ? { type_id } : {}),
      user_id: req.userId as string,
    });

    // Guardamos la instancia (esto dispara @BeforeUpdate)
    await existProject.save();

    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const existProject = await Project.findOne({ where: { id } });
    if (!existProject) throw HttpException(Errors.PROJECT_NOT_FOUND);
    existProject.set({
      user_id: req.userId as string,
    });
    await existProject.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const existProject = await Project.findOne({ where: { id } });
    if (!existProject) throw HttpException(Errors.PROJECT_NOT_FOUND);
    
    let where: Record<string, any> = {};

    where.id = id
    if (req.query.search) {
      const searchTerm = `%${req.query.search}%`;
      (where as any)[Op.or] = [
        { name: { [Op.iLike]: searchTerm } },
        { description: { [Op.iLike]: searchTerm } },
      ];
    }
    else {
      if (req.query.name) where.name = { [Op.iLike]: `%${req.query.name}%` };
      if (req.query.description) where.description = { [Op.iLike]: `%${req.query.description}%` };;
    }
    if (req.query.start_date) where.start_date = req.query.start_date;
    if (req.query.end_date) where.end_date = req.query.end_date;
    if (req.query.state_id) where.state_id = { [Op.eq]: req.query.state_id };
    if (req.query.type_id) where.type_id = { [Op.eq]: req.query.type_id };

    const project = await Project.findOne({ where })

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {

  let field = "name";
  let direction: "ASC" | "DESC" = "ASC";

  if (req.query.order) {
    const [orderField, orderDirection] = req.query.order.toString().split("__");
    
    if (["ASC", "DESC"].includes(orderDirection.toUpperCase())) {
      field = orderField;
      direction = orderDirection.toUpperCase() as "ASC" | "DESC";
    }
  }

  let where: Record<string, any> = {};

  if (req.query.search) {
    const searchTerm = `%${req.query.search}%`;
    (where as any)[Op.or] = [
      { name: { [Op.iLike]: searchTerm } },
      { description: { [Op.iLike]: searchTerm } },
    ];
  }
  else {
    if (req.query.name) where.name = { [Op.iLike]: `%${req.query.name}%` };
    if (req.query.description) where.description = { [Op.iLike]: `%${req.query.description}%` };;
  }
  if (req.query.start_date) where.start_date = req.query.start_date;
  if (req.query.end_date) where.end_date = req.query.end_date;
  if (req.query.state_id) where.state_id = { [Op.eq]: req.query.state_id };
  if (req.query.type_id) where.type_id = { [Op.eq]: req.query.type_id };

  try {
    const projects = await Project.findAll({
      where,
      order: [[field, direction]]
    });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
