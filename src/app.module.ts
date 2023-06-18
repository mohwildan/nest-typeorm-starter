import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApisModule } from './apis/apis.module';
import { BaseModule } from './base/base.module';
import config from './config/configuration';
import { AuthMiddleware } from './middelwares/auth/auth.middleware';
import { DatabaseService } from './services/database/database.service';
import { ServicesModule } from './services/services.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    ServicesModule,
    BaseModule,
    UtilsModule,
    ApisModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
