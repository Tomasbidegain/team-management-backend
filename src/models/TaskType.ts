import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Task } from "./Task";

@Table({ tableName:"task_types", createdAt: "created_at", updatedAt: "updated_at" })
export class TaskType extends Model<TaskType> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => Task)
  tasks!: Task[]
}