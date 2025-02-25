import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { User } from "./User";
import { IRole } from "../interfaces/models/IRole";

@Table({ tableName:"roles", createdAt: "created_at", updatedAt: "updated_at" })
export class Role extends Model<Role> implements IRole {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ field: "created_at", type: DataType.DATE })
  created_at!: Date;

  @Column({ field: "updated_at", type: DataType.DATE })
  updated_at!: Date;

  @HasMany(() => User)
  users!: User[]
}