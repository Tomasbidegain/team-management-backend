import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, AfterCreate, BeforeUpdate, BeforeDestroy,  } from "sequelize-typescript";
import { ProjectState } from "./ProjectState";
import { ProjectType } from "./ProjectType";
import { ProjectHistory } from "./ProjectHistory";
import { Task } from "./Task";
import { UserProject } from "./UserProject";
import { IProject } from "../interfaces/models/IProject";
import { historyActions } from "../interfaces/enums/historyActions";

@Table({ tableName: "projects", createdAt: "created_at", updatedAt: "updated_at" })

export class Project extends Model<IProject> implements IProject {
  @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
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

  @ForeignKey(() => ProjectState)
  @Column({ type: DataType.UUID, allowNull: false })
  state_id!: string;

  @BelongsTo(() => ProjectState)
  state!: ProjectState;
  
  @ForeignKey(() => ProjectType)
  @Column({ type: DataType.UUID, allowNull: false })
  type_id!: string;

  @BelongsTo(() => ProjectType)
  type!: ProjectType;

  @HasMany(() => ProjectHistory)
  histories!: ProjectHistory[]

  @HasMany(() => Task)
  tasks!: Task[]

  @HasMany(() => UserProject)
  user_projects!: UserProject[]
  
  // History project

  @Column(DataType.VIRTUAL)
  user_id!: string

  @AfterCreate
  static async logCreation(instance: Project) {
    await ProjectHistory.create({
      project_id: instance.id,
      user_id: instance.getDataValue("user_id") as string,
      action: historyActions.CREATE,
      field: "project",
      new_value: JSON.stringify(instance),
      old_value: "",
    });
  }

  @BeforeUpdate
  static async logUpdate(instance: Project) {
    const previous = await Project.findByPk(instance.id);
    if (!previous) return;

    const changes: Partial<Record<keyof IProject, string | Date | undefined>> = {};
    
    Object.keys(instance.dataValues).forEach((key) => {
      const typedKey = key as keyof IProject;
      
      const newValue = instance.getDataValue(typedKey);
      const oldValue = previous.getDataValue(typedKey);

      // Si el campo es una fecha, convertimos ambos valores a string ISO sin milisegundos
      const formattedNew = newValue instanceof Date ? newValue.toISOString().slice(0, 19) : newValue;
      const formattedOld = oldValue instanceof Date ? oldValue.toISOString().slice(0, 19) : oldValue;

      if (formattedNew !== formattedOld) {
        changes[typedKey] = newValue;
      }
    });

    for (const key of Object.keys(changes)) {
      const typedKey = key as keyof IProject;
      if (key === "created_at" || key === "updated_at" || key === "user_id") continue;
      await ProjectHistory.create({
        project_id: instance.id,
        user_id: instance.getDataValue("user_id") as string,
        action: historyActions.UPDATE,
        field: typedKey,
        old_value: JSON.stringify(previous.getDataValue(typedKey)) || "",
        new_value: JSON.stringify(changes[typedKey]),
      });
    }
  }

  @BeforeDestroy
  static async logDeletion(instance: Project) {
    await ProjectHistory.create({
      project_id: instance.id,
      user_id: instance.getDataValue("user_id") as string,
      action: historyActions.DELETE,
      field: "project",
      old_value: JSON.stringify(instance),
      new_value: JSON.stringify(instance),
    });
  }
}