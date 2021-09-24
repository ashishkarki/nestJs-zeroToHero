import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tell Nestjs to run this Validator whenever it
  // encounters our validation decorators like in create-task.dto
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
