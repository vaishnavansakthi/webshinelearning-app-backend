/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.enableCors({
  //   credentials: true,
  //   origin: 'http://localhost:5173',
  //   methods: ['POST', 'GET', 'PUT', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'], // Add your additional headers here
  // });

  const config = new DocumentBuilder()
    .setTitle('Webshinelearning portal API')
    .setDescription('To give a best learning portal')
    .setVersion('1.0')
    .addApiKey({type: 'apiKey', name: 'x-api-key', in: 'header'}, 'x-api-key')
    .addBearerAuth({ type: 'http', name: 'authorization', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Webshinelearning API',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
