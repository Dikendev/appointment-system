import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    console.log('onModuleInit PrismaService');
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
