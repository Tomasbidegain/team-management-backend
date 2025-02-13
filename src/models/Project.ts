import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ProjectState } from "./ProjectState";
import { ProjectType } from "./ProjectType";
import { ProjectHistory } from "./ProjectHistory";
import { Task } from "./Task";
import { UserProject } from "./UserProject";

@Table({ tableName: "projects", createdAt: "created_at", updatedAt: "updated_at" })

export class Project extends Model <Project> {
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
}