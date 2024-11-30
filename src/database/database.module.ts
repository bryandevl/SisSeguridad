import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'mariadb',
          host: configService.host,
          port: parseInt(configService.port_db),
          username: configService.user_name,
          password: configService.password,
          database: configService.database,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule { }
