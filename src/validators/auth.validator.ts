import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class PostRegisterDTO {
  @IsString({
    message: 'El nombre debe ser una cadena de texto'
  })
  declare first_name: string;
  @IsString({
    message: 'El apellido debe ser una cadena de texto'
  })
  declare last_name: string;
  @IsString({
    message: 'El rol debe ser una cadena de texto'
  })
  declare role_id: string;
  
  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(30, { message: 'La contraseña no debe exceder los 30 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-]).{8,}$/, {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un símbolo'
  })
  declare password: string
}

export class PostLoginDTO {


  @IsEmail()
  declare email: string;

  @IsString({
    message: 'La contraseña debe ser una cadena de texto'
  })
  
  declare password: string
}