export default () => ({
  server: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    host: process.env.HOST ?? 'localhost',
    mode: process.env.NODE_ENV ?? 'development',
    apiPrefix: process.env.API_PREFIX ?? 'api',
    corsOrigin: process.env.CORS_ORIGIN ?? '*',
  },

  swagger: {
    title: process.env.SWAGGER_TITLE ?? 'NestJS API',
    description: process.env.SWAGGER_DESCRIPTION ?? 'API Documentation',
    version: process.env.SWAGGER_VERSION ?? '1.0',
    path: process.env.SWAGGER_PATH ?? 'docs',
  },
});
