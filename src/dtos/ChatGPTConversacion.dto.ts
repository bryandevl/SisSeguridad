import { IsString, IsOptional, IsInt } from 'class-validator';

export class ChatGPTConversacionDto {
  // ID del usuario que envía el mensaje
  @IsInt()
  id_usuario: number;

  // Mensaje del usuario
  @IsString()
  mensaje_usuario: string;

  // Contexto adicional de la conversación (opcional)
  @IsOptional()
  @IsString()
  contexto?: string;
}
