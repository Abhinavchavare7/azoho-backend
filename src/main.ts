import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // your frontend origin
    credentials: true, // allow cookies if using them
  });
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API to manage Users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // <- This line mounts Swagger at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
