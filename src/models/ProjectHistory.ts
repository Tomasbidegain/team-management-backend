import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";
import { Project } from "./Project";

@Table({ tableName: "project_history", createdAt: "created_at", updatedAt: "updated_at"})
export class ProjectHistory extends Model <ProjectHistory> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true})
  id!: string

  @Column({ type: DataType.STRING, allowNull: false })
  field!: string;
  
  @Column({ type: DataType.TEXT })
  old_value!: string;
  
  @Column({ type: DataType.TEXT })
  new_value!: string;
  
  @Column({ type: DataType.DATE, allowNull: false })
  changed_at!: Date;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id!: string

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => Project)
  @Column({ type: DataType.UUID, allowNull: false })
  project_id!: string

  @BelongsTo(() => Project)
  project!: Project
}