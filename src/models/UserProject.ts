import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Project } from "./Project";
import { ProjectRole } from "./ProjectRole";
import { IUserProject } from "../interfaces/models/IUserProject";

@Table({
  tableName: "user_projects",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class UserProject extends Model<UserProject> implements IUserProject {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID, allowNull: false })
  project_id!: string;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => ProjectRole)
  @Column({ type: DataType.UUID, allowNull: false })
  role_id!: string;

  @BelongsTo(() => ProjectRole)
  role!: ProjectRole;
}