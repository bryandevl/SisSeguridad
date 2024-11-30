import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  // Correo electrónico del usuario
  @IsEmail()
  correo: string;

  // Contraseña del usuario
  @IsString()
  contraseña: string;
}

//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