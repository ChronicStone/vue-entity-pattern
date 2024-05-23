import { consola } from 'consola';

export default defineNuxtRouteMiddleware((to, from) => {
  consola.info('Middleware: entity-access');
  if (!to.meta.entities) return;
  if (!isEntity(to.meta.entities)) return navigateTo('/');
});
