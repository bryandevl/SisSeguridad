import { IsString, IsEmail, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateUsuarioDto {
  // Nombre del usuario
  @IsString()
  nombre: string;

  // Documento de identidad (DNI)
  @IsInt()
  documento: number;

  // Correo electrónico del usuario
  @IsEmail()
  correo: string;

  // Número de teléfono (opcional)
  @IsOptional()
  @IsString()
  telefono?: string;

  // Contraseña del usuario (requiere validación adicional en producción)
  @IsString()
  contraseña: string;

  // Rol del usuario: puede ser 'vecino' o 'admin'
  @IsEnum(['vecino', 'admin'])
  rol: 'vecino' | 'admin';

  // Estado del usuario: 'activo' o 'inactivo'
  @IsEnum(['activo', 'inactivo'])
  @IsOptional()  // Marca este campo como opcional si no es obligatorio
  estado?: 'activo' | 'inactivo';

  // Fecha de registro: es opcional, ya que la base de datos puede manejar esto automáticamente
  @IsOptional()
  fecha_registro?: Date;
}
