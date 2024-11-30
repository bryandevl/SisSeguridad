import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config, { validation } from './config/config';
import * as Joi from 'joi';
import { ClienteController } from './controllers/cliente.controller';
import { TestController } from './controllers/test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/api.controller';
import { Familiar } from './entities/familiar.entity';
import { ConversacionChatGPT } from './entities/conversacion-chatgpt.entity';
import { ChatGPTController} from './controllers/chatgpt.controller';
import { ChatGPTService } from './services/chatgpt.service';






@Module({
	imports: [
		TypeOrmModule.forFeature([Usuario,Familiar,ConversacionChatGPT]),
		ConfigModule.forRoot({
			// * Definimos que es global
			isGlobal: true,
			// * Definimos el archivo de configuracion
			envFilePath: '.env',
			// * Definimos el esquema y la validacion
			load: [config],
			validationSchema: Joi.object(validation),
		}),
		DatabaseModule,
	],
	providers: [UsuariosService,ChatGPTService],
	controllers: [AppController, ClienteController,TestController,UsuariosController,ChatGPTController],
})
export class AppModule {}
