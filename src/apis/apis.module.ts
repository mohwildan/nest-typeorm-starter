import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SuperadminApiService } from './superadmin-api/superadmin-api.service';

@Module({
  providers: [SuperadminApiService],
  imports: [HttpModule.register({})],
})
export class ApisModule {}
