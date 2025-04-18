import { INestApplication } from '@nestjs/common';
import { setupCors } from '@config/cors.config';
import { setupLogger } from '@config/logger.config';

export async function setupApp(app: INestApplication) {
  // O'rnatish logger birinchi bo'lishi kerak
  setupLogger(app);

  // CORS sozlamalari
  setupCors(app);

  return app;
}
