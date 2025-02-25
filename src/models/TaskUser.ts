import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Task } from "./Task";
import { ITaskUser } from "../interfaces/models/ITaskUser";

@Table({ tableName: "task_users", createdAt: "created_at", updatedAt: "updated_at"})
export class TaskUser extends Model<TaskUser> implements ITaskUser {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  assigned_at!: Date;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Task)
  @Column({ type: DataType.UUID, allowNull: false })
  task_id!: string;

  @BelongsTo(() => Task)
  task!: Task;
}