import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(cookieParser());
  
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.enableCors();
  await app.listen(port);
}
bootstrap();
