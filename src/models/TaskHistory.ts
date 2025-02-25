import { Model, Column, DataType, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import { User } from "./User";
import { Task } from "./Task";
import { ITaskHistory } from "../interfaces/models/ITaskHistory";
import { historyActions } from "../interfaces/enums/historyActions";

@Table({ tableName: "task_history", createdAt: "created_at", updatedAt: "updated_at" })
export class TaskHistory extends Model<ITaskHistory>  implements ITaskHistory {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  field!: string;

  @Column({ type: DataType.TEXT })
  old_value!: string;

  @Column({ type: DataType.TEXT })
  new_value!: string;

  @Column({ type: DataType.ENUM(...Object.values(historyActions)), allowNull: false })
  action!: historyActions;

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