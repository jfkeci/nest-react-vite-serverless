import { ClientModule } from '../../client/client.module';

export const routerConfig = () => [
  {
    path: 'app',
    module: ClientModule,
  },
];
