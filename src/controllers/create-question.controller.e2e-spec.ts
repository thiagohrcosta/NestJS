import { AppModule } from "@/app.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing"
import { response } from "express";
import { Prisma } from "generated/prisma";
import { hash } from "node:crypto";
import request from "supertest"

describe('Create question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] / questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: "Jonny Doe",
        email: 'jonnydoe@examplemail.com',
        password: '123456',
      }
    })

    const accessToken = jwt.sign({ sub: user.id })

    await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
      title: "Question test",
      content: "Only a test about the question's content."
    })

    expect(response.statusCode).toBe(200)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: "Question test",
      }
    })

    expect(questionOnDatabase).toBeTruthy()
  })
})