import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';
import { NestClsContextStorageService } from './nestjs-cls/nest-cls-context-storage.service';
import { ContextStorageServiceKey } from '../domain/context-storage-service.interface';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  providers: [
    {
      provide: ContextStorageServiceKey,
      useClass: NestClsContextStorageService,
    },
  ],
  controllers: [],
  exports: [ContextStorageServiceKey],
})
export class ContextModule {}
