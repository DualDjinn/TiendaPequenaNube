import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth.interceptor';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { routes } from './app.routes';
import { CART_PERSISTENCE } from './core/services/cart-persistence';
import { LocalStorageCartPersistence } from './core/services/local-storage-cart-persistence';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.src.startsWith('http') || config.src.startsWith('images/')) return config.src;
        return `https://res.cloudinary.com/pjhkswfc/image/fetch/f_auto,q_auto/${config.src}`;
      },
    },
    { provide: CART_PERSISTENCE, useClass: LocalStorageCartPersistence },
  ],
};
