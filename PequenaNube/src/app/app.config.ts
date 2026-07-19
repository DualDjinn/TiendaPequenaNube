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
        const src = config.src;
        const w = config.width || 600;
        if (src.startsWith('images/') || !src.startsWith('http')) return src;
        const uploadMarker = 'res.cloudinary.com/pjhkswfc/image/upload/';
        if (src.includes(uploadMarker)) {
          const parts = src.split(uploadMarker);
          return parts[0] + uploadMarker + `w_${w},c_fit,f_auto,q_auto/` + parts[1];
        }
        return `https://res.cloudinary.com/pjhkswfc/image/fetch/w_${w},c_fit,f_auto,q_auto/${encodeURIComponent(src)}`;
      },
    },
    { provide: CART_PERSISTENCE, useClass: LocalStorageCartPersistence },
  ],
};
