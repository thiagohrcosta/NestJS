import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrsimaService extends PrismaClient {
  public client: PrismaClient

  constructor() {
    super({
      log: ['warn', 'error']
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}