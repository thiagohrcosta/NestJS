import { ConflictException } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrsimaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs"

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrsimaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'Email already in use.'
      )
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  }
}