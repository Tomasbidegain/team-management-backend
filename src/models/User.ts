import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Role } from "./Role";
import { TaskHistory } from "./TaskHistory";
import { ProjectHistory } from "./ProjectHistory";
import { TaskUser } from "./TaskUser";
import { UserProject } from "./UserProject";
import { IUser } from "../interfaces/models/IUser";

@Table({ tableName: "users", createdAt: "created_at", updatedAt: "updated_at" })
export class User extends Model<IUser> implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: false })
  role_id!: string;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => TaskHistory)
  task_histories!: TaskHistory[];

  @HasMany(() => ProjectHistory)
  project_histories!: ProjectHistory[];

  @HasMany(() => TaskUser)
  task_users!: TaskUser[];

  @HasMany(() => UserProject)
  user_projects!: UserProject[];
}