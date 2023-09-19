import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Callback, Handler, Context, APIGatewayEvent } from 'aws-lambda';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

let server: Handler;

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    try {
      const app = await NestFactory.create(AppModule);

      /** Set CORS config so that only the client can make requests to the API */
      app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: false,
        allowedHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent',
          'Access-Control-Allow-Origin',
        ],
      });

      app.setGlobalPrefix('app');

      /** Registers pipes as global pipes (will be used within every HTTP route handler) */
      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

      /** Use serverless middleware */
      app.use(awsServerlessExpressMiddleware.eventContext());

      /** Init app */
      await app.init();

      /** Return server */
      server = serverlessExpress({
        app: app.getHttpAdapter().getInstance(),
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return server(event, context, callback);
};
