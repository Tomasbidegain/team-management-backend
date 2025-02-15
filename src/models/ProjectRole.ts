import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { UserProject } from "./UserProject";

@Table({ tableName:"project_roles", createdAt: "created_at", updatedAt: "updated_at" })
export class ProjectRole extends Model<ProjectRole> implements ProjectRole {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => UserProject)
  user_projects!: UserProject[]
}