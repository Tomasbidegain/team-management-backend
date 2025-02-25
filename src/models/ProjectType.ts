import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "./Project";
import { IProjectType } from "../interfaces/models/IProjectType";

@Table({ tableName:"project_types", createdAt: "created_at", updatedAt: "updated_at" })
export class ProjectType extends Model<ProjectType> implements IProjectType{
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @HasMany(() => Project)
  projects!: Project[]
}