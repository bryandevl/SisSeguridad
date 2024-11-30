import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @Column({ nullable: true })
  telefono: string;



  @Column()
  rol: 'vecino' | 'admin';

  @CreateDateColumn()
  fecha_registro: Date;

  @Column()
  estado: 'activo' | 'inactivo';


}
