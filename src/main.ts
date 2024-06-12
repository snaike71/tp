import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// Utilisation de require pour importer cookie-session
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration de cookie-session
  app.use(
    cookieSession({
      keys: ['ynov'],
    }),
  );
  
  // Utilisation de ValidationPipe globalement
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  
  await app.listen(3000);
}
bootstrap();
