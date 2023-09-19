import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ClientModule } from './client/client.module';
import { routerConfig } from './utils/config/router.config';

@Module({
  imports: [RouterModule.register(routerConfig()), ClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
