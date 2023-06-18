import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {join} from 'path';
import config from 'src/config/configuration';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: `mongodb://${config().db.username}:${config().db.password}@${
        config().db.host
      }:${config().db.port}/?authSource=${config().db.authSource}`,
      database: config().db.database,
      entities: [join(__dirname, '../../**/**.entity{.ts,.js}')],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
    };
  }
}
