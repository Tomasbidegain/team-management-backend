import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Project } from "./Project";
import { ProjectRole } from "./ProjectRole";

@Table({ tableName:"user_projects", createdAt: "created_at", updatedAt: "updated_at" })
export class UserProject extends Model<UserProject> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

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