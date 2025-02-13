import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName:"roles", createdAt: "created_at", updatedAt: "updated_at" })
export class Role extends Model<Role> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => User)
  users!: User[]
}