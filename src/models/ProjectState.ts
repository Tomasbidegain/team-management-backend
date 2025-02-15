import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "./Project";
import { IProjectState } from "../interfaces/IProjectState";

@Table({ tableName:"project_states", createdAt: "created_at", updatedAt: "updated_at" })
export class ProjectState extends Model<ProjectState> implements IProjectState {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Project)
  projects!: Project[]
}