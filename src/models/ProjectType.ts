import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "./Project";
import { IProjectType } from "../interfaces/IProjectType";

@Table({ tableName:"project_types", createdAt: "created_at", updatedAt: "updated_at" })
export class ProjectType extends Model<ProjectType> implements IProjectType{
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Project)
  projects!: Project[]
}