import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class PostProjectDTO {
  @IsString({
    message: "El nombre debe ser una cadena de texto",
  })
  declare name: string;

  @IsString({
    message: "La descripcion debe ser una cadena de texto",
  })
  declare description: string;

  @Type(() => Date)
  @IsDate({
    message: "La fecha de inicio debe ser una fecha",
  })
  declare start_date: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "La fecha de fin debe ser una fecha",
  })
  declare end_date: Date | undefined;

  @IsString({
    message: "El id del estado debe ser una cadena de texto",
  })
  declare state_id: string;

  @IsString({
    message: "El id del tipo debe ser una cadena de texto",
  })
  declare type_id: string;
}

export class PutProjectDTO {

  @IsOptional()
  @IsString({
    message: "El nombre debe ser una cadena de texto",
  })
  declare name: string;

  @IsOptional()
  @IsString({
    message: "La descripcion debe ser una cadena de texto",
  })
  declare description: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "La fecha de inicio debe ser una fecha",
  })
  declare start_date: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({
    message: "La fecha de fin debe ser una fecha",
  })
  declare end_date: Date | undefined;

  @IsOptional()
  @IsString({
    message: "El id del estado debe ser una cadena de texto",
  })
  declare state_id: string;

  @IsOptional()
  @IsString({
    message: "El id del tipo debe ser una cadena de texto",
  })
  declare type_id: string;
}
