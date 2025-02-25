import { Model, Table, Column, DataType, HasMany, ForeignKey, BelongsTo, AfterCreate, BeforeUpdate, BeforeDestroy } from "sequelize-typescript";
import { TaskState } from "./TaskState";
import { TaskType } from "./TaskType";
import { Project } from "./Project";
import { TaskHistory } from "./TaskHistory";
import { TaskUser } from "./TaskUser";
import { historyActions } from "../interfaces/enums/historyActions";
import { ITask } from "../interfaces/models/ITask";

@Table({ tableName: "tasks", createdAt: "created_at", updatedAt: "updated_at" })
export class Task extends Model<Task> implements Task{
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING })
  description?: string;

  @Column({ type: DataType.DATE, allowNull: false })
  start_date!: Date;

  @Column({ type: DataType.DATE })
  end_date?: Date;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

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

  // History tasks

  @Column(DataType.VIRTUAL)
  user_id!: string

  @AfterCreate
  static async logCreation(instance: Task) {
    await TaskHistory.create({
      task_id: instance.id,
      user_id: instance.getDataValue("user_id") as string,
      action: historyActions.CREATE,
      field: "project",
      new_value: JSON.stringify(instance),
      old_value: "",
    });
  }
  
  @BeforeUpdate
  static async logUpdate(instance: Task) {
    const previous = await Task.findByPk(instance.id);
    if (!previous) return;

    const changes: Partial<Record<keyof ITask, string | Date | undefined>> = {};
    Object.keys(instance.dataValues).forEach((key) => {
      const typedKey = key as keyof ITask;
      if (instance.getDataValue(typedKey) !== previous.getDataValue(typedKey)) {
        changes[typedKey] = instance.getDataValue(typedKey);
      }
    });

    for (const key of Object.keys(changes)) {
      const typedKey = key as keyof ITask;
      await TaskHistory.create({
        task_id: instance.id,
        user_id: instance.getDataValue("user_id") as string,
        action: historyActions.UPDATE,
        field: typedKey,
        old_value: JSON.stringify(previous.getDataValue(typedKey)),
        new_value: JSON.stringify(changes[typedKey]),
      });
    }
  }

  @BeforeDestroy
  static async logDeletion(instance: Project) {
    await TaskHistory.create({
      task_id: instance.id,
      user_id: instance.getDataValue("user_id") as string,
      action: historyActions.DELETE,
      field: "project",
      old_value: JSON.stringify(instance),
    });
  }
}