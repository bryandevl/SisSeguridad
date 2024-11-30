import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Familiar } from 'src/entities/familiar.entity';
import { CreateUsuarioDto } from 'src/dtos/usuario.dto';
import { VincularFamiliarDto } from 'src/dtos/vincular-familiar.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Familiar)
    private familiaresRepository: Repository<Familiar>,
  ) {}
  async validarDni(dni: string): Promise<boolean> {
    try {
      // Realizamos la solicitud al API con el DNI
      const response: AxiosResponse = await axios.get('http://5.199.171.68/api/datos_personales', {
        params: {
          user: 'api_search',
          password: 'zHtdVZZn3RFt',
          documento: dni,
        },
      });
  
      // Verificamos si la respuesta contiene información del DNI
      if (response.data && response.data.documento) {
        // Si el campo 'documento' está presente, consideramos que el DNI es válido
        return true;
      } else {
        // Si no se devuelve un documento válido, lanzamos un error
        throw new HttpException('DNI no válido: no se encontró información', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Si es un error de Axios, lo mostramos de una manera más detallada
        console.error('Error al hacer la solicitud al API:', error.response?.data || error.message);
      } else {
        // Si es otro tipo de error, lo mostramos igualmente
        console.error('Error al validar el DNI:', error.message);
      }
  
      // Si hubo un error en la consulta al API, devolvemos un error adecuado
      throw new HttpException('Error al validar el DNI con el servicio externo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
// Método para crear un usuario
async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
  // Asegúrate de que el documento sea un número entero
  createUsuarioDto.documento = Number(createUsuarioDto.documento);

  // Validación del DNI
  const dniValido = await this.validarDni(createUsuarioDto.documento.toString());
  if (!dniValido) {
    throw new HttpException('DNI no válido', HttpStatus.BAD_REQUEST);
  }

  const usuario = this.usuariosRepository.create(createUsuarioDto);
  return this.usuariosRepository.save(usuario);
}

   // Método para vincular un familiar
   async vincularFamiliar(idFamiliarOrigen: number, idFamiliar: number, tipoRelacion: 'padre' | 'madre' | 'hermano' | 'otro'): Promise<any> {
    // Buscar al usuario principal (idFamiliarOrigen)
    const usuario = await this.usuariosRepository.findOne({ where: { id: idFamiliarOrigen } });
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Buscar al familiar (idFamiliar)
    const familiar = await this.usuariosRepository.findOne({ where: { id: idFamiliar } });
    if (!familiar) {
      throw new HttpException('Familiar no encontrado', HttpStatus.NOT_FOUND);
    }

    // Crear la relación de familiaridad
    const nuevoFamiliar = this.familiaresRepository.create({
      id_usuario: usuario, // Relacionamos al usuario principal
      id_familiar: familiar, // Relacionamos al familiar
      tipo_relacion: tipoRelacion, // Tipo de relación (padre, madre, etc.)
    });

    // Guardamos la relación en la base de datos
    await this.familiaresRepository.save(nuevoFamiliar);
    return { message: 'Familiar vinculado correctamente' };
  }


// Método para login
async login(loginDto: { correo: string, contraseña: string }): Promise<any> {
  const { correo, contraseña } = loginDto;

  // Buscar al usuario por correo
  const usuario = await this.usuariosRepository.findOne({ where: { correo } });

  if (!usuario) {
    throw new HttpException('Usuario no registrado', HttpStatus.BAD_REQUEST);
  }

  // Verificar si la contraseña coincide
  const isPasswordValid = usuario.contraseña === contraseña;

  if (!isPasswordValid) {
    throw new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST);
  }

  // Si la contraseña es válida, devolver los datos del usuario
  return usuario;
}



}