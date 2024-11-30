import { IsInt, IsEnum, IsNotEmpty } from 'class-validator';

export class VincularFamiliarDto {
  @IsInt()
  @IsNotEmpty()
  id_familiar: number;  // ID del familiar a vincular

  @IsEnum(['padre', 'madre', 'hermano', 'otro'])
  @IsNotEmpty()
  tipo_relacion: 'padre' | 'madre' | 'hermano' | 'otro';  // Tipo de relación
}