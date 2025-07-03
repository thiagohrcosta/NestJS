import { Module } from '@nestjs/common'
import { PrsimaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  // imports: [],
  controllers: [CreateAccountController],
  providers: [PrsimaService],
})
export class AppModule {}
