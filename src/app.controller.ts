import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PrsimaService } from './prisma/prisma.service'

@Controller('/api')
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrsimaService,
  ) {}

  @Get('/hello')
  index(): string {
    return this.appService.getHello()
  }

  @Post('/hello')
  async store() {
    return await this.prisma.user.findMany()
  }
}

