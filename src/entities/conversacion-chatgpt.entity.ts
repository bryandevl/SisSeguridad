import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity'; // Importar la entidad de Usuario

@Entity('conversaciones_chatgpt')
export class ConversacionChatGPT {
  @PrimaryGeneratedColumn()
  id: number; // Identificador único de la conversación

  @Column()
  id_usuario: number; // ID del usuario que interactuó con ChatGPT

  @Column('text')
  mensaje_usuario: string; // Mensaje del usuario

  @Column('text')
  mensaje_chatgpt: string; // Respuesta de ChatGPT

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date; // Fecha y hora de la conversación

  @Column('text', { nullable: true })
  contexto: string; // Contexto de la conversación (si aplica)
}