import { Module } from '@nestjs/common'
import { PrsimaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: env => envSchema.parse(env),
    }),
    AuthModule,
  ],
  controllers: [CreateAccountController],
  providers: [PrsimaService],
})
export class AppModule {}
