import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { TaskState } from "./TaskState";
import { TaskType } from "./TaskType";
import { Project } from "./Project";
import { TaskHistory } from "./TaskHistory";
import { TaskUser } from "./TaskUser";

@Table({ tableName: "tasks", createdAt: "created_at", updatedAt: "updated_at" })
export class Task extends Model<Task> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  start_date!: Date;

  @Column({ type: DataType.DATE })
  end_date?: Date;

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID, allowNull: false })
  project_id!: string;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => TaskState)
  @Column({ type: DataType.UUID, allowNull: false })
  state_id!: string;

  @BelongsTo(() => TaskState)
  state!: TaskState;
  
  @ForeignKey(() => TaskType)
  @Column({ type: DataType.UUID, allowNull: false })
  type_id!: string;

  @BelongsTo(() => TaskType)
  type!: TaskType;

  @HasMany(() => TaskHistory)
  task_histories!: TaskHistory[]

  @HasMany(() => TaskUser)
  task_users!: TaskUser[]
}