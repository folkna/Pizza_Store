import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';

dotenv.config(); // โหลด .env file 
console.log('Environment variables:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
});

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my-secret', // ตั้งค่า secret
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax', // สำคัญกับ cross-origin
      }, // 1 วัน
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'picture'), {
    prefix: '/picture', // URL เริ่มต้น
  });
  await app.listen(process.env.PORT ?? 3000);
}

console.log('**************************************************************');
console.log('Starting Backend...AT PORT:', process.env.PORT ?? 3000);
console.log('**************************************************************');

void bootstrap();
