import { TransformInterceptor } from './transform-interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // apply logging using nestjs built-in module
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  // tell Nestjs to run this Validator whenever it
  // encounters our validation decorators like in create-task.dto
  app.useGlobalPipes(new ValidationPipe());

  // interceptor that takes class object and converts it into plain text/json
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);

  logger.log(`Application listening on port: 3000`);
}
bootstrap();
