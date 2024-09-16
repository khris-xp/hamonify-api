import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GLOBAL_CONFIG } from './shared/constants/global-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(GLOBAL_CONFIG.PORT) || 3000;
  const isDevelopmentMode = configService.get<string>(
    GLOBAL_CONFIG.IS_DEVELOPMENT,
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  if (isDevelopmentMode) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('HealJai API')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('document', app, document);
  }

  await app.listen(port);
}
bootstrap();
