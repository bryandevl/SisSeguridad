import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('familiares')
export class Familiar {
  @PrimaryGeneratedColumn()
  id: number;

  
  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id_familiar' })
  id_familiar: Usuario;

  @Column({
    type: 'enum',
    enum: ['padre', 'madre', 'hermano', 'otro'],
  })
  tipo_relacion: 'padre' | 'madre' | 'hermano' | 'otro';
}
