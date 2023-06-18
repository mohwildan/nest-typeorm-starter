import { Global, Module } from '@nestjs/common';
import { Functions } from './functions';

@Global()
@Module({
  providers: [Functions],
  exports: [Functions],
})
export class UtilsModule {}
