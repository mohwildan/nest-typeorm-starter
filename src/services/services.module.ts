import { Global, Module } from '@nestjs/common';
import { AppLocalsService } from './app-locals/app-locals.service';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  providers: [AppLocalsService, DatabaseService],
  exports: [AppLocalsService],
})
export class ServicesModule {}
