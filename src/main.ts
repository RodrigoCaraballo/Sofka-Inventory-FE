import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare global {
  interface Window {
    _env: {
      COMMAND_API: string;
      QUERY_API: string;
      SOCKET_API: string;
    };
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
