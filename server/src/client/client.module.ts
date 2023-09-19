import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClientController } from './controller/client.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'client-dist'),
    }),
  ],
  controllers: [ClientController],
})
export class ClientModule {}
