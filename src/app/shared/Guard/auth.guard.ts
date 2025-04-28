import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;
  let id: string | null = null;
  let name: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
    id = localStorage.getItem('id');
    name = localStorage.getItem('name');
  }
  if (!token) {
    const router = inject(Router);
    router.navigateByUrl('/login');
  }
  return token ? true : false;
};
