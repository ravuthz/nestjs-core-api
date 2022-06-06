import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('NestApplication.main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT', 3000);
  // It the same as process.env.PORT || 3000

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: false,
    }),
  );
  // const { httpAdapter }: HttpAdapterHost<any> = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalFilters(new HttpExceptionFilter());
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new QueryErrorFilter(httpAdapter));
  await app.listen(port);

  logger.log(`Server is listening on ${await app.getUrl()}`);
  logger.log(`Server is listening on http://localhost:${port}/api`);
}

bootstrap();
