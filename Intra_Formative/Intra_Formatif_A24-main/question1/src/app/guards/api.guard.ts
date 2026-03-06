import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { User } from '../user';

export const apiGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  if(user == null){
    return createUrlTreeFromSnapshot(route, ['/login']);
  }
  return true;
};
