import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsuariosService } from 'src/services/usuarios.service';
import { CreateUsuarioDto } from 'src/dtos/usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('create-user')
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('vincular-familiar')
  async vincularFamiliar(@Body() body: { 
    id_familiar_origen: number;  // ID del usuario que vincula
    id_familiar: number;         // ID del familiar a vincular
    tipo_relacion: 'padre' | 'madre' | 'hermano' | 'otro'; // Tipo de relación
  }) {
    const { id_familiar_origen, id_familiar, tipo_relacion } = body;
    return this.usuariosService.vincularFamiliar(id_familiar_origen, id_familiar, tipo_relacion);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usuariosService.login(loginDto);
  }

}