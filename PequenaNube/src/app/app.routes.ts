import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { NotFound } from './features/not-found/not-found';
import { adminGuard } from './features/admin/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', loadComponent: () => import('./features/catalog/catalog').then(m => m.Catalog) },
  { path: 'producto/:slug', loadComponent: () => import('./features/product-detail/product-detail').then(m => m.ProductDetail) },
  { path: 'admin/login', loadComponent: () => import('./features/admin/admin-login').then(m => m.AdminLogin) },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
    canActivate: [adminGuard],
    children: [
      { path: '', loadComponent: () => import('./features/admin/product-list').then(m => m.AdminProductList) },
      { path: 'nuevo', loadComponent: () => import('./features/admin/product-form').then(m => m.ProductForm) },
      { path: 'editar/:id', loadComponent: () => import('./features/admin/product-form').then(m => m.ProductForm) },
      { path: 'lineas', loadComponent: () => import('./features/admin/lineas').then(m => m.AdminLineas) },
      { path: 'categorias', loadComponent: () => import('./features/admin/categorias').then(m => m.AdminCategorias) },
      { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard').then(m => m.AdminDashboard) },
    ],
  },
  { path: 'checkout/success', loadComponent: () => import('./features/checkout/success').then(m => m.CheckoutSuccess) },
  { path: 'checkout/failure', loadComponent: () => import('./features/checkout/failure').then(m => m.CheckoutFailure) },
  { path: 'checkout/pending', loadComponent: () => import('./features/checkout/pending').then(m => m.CheckoutPending) },
  { path: '**', component: NotFound },
];
