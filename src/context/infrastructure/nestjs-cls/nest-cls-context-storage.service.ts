import { Injectable } from '@nestjs/common';
import { CLS_ID, ClsService } from 'nestjs-cls';
import { ContextStorageServiceInterface } from '../../domain/context-storage-service.interface';

@Injectable()
export class NestClsContextStorageService
  implements ContextStorageServiceInterface
{
  constructor(private readonly cls: ClsService) {}

  setContextId(contextId: string): void {
    this.cls.set(CLS_ID, contextId);
  }

  getContextId(): string | undefined {
    return this.cls.getId();
  }

  get<T>(key: string): T {
    return this.cls.get(key);
  }

  set<T>(key: string, value: T): void {
    this.cls.set(key, value);
  }
}
