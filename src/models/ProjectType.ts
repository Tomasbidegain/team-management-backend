import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Project } from "./Project";

@Table({ tableName:"project_types", createdAt: "created_at", updatedAt: "updated_at" })
export class ProjectType extends Model<ProjectType> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Project)
  projects!: Project[]
}