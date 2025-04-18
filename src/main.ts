import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupApp } from '@config/app.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await setupApp(app);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    await app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    Logger.error(
      `Error starting server(${new Date().toISOString()}): ${error.message}`,
      error.stack,
    );
    process.exit(1);
  }
}
bootstrap();
