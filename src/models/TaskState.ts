import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Task } from "./Task";
import { ITaskState } from "../interfaces/models/ITaskState";

@Table({ tableName:"task_states", createdAt: "created_at", updatedAt: "updated_at" })
export class TaskState extends Model<TaskState>  implements ITaskState {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @HasMany(() => Task)
  tasks!: Task[]
}