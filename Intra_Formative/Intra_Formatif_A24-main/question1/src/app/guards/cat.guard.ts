import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { User } from '../user';

export const catGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  if(user){
    let curent: User = JSON.parse(user);
    if(curent.prefercat){
      return true;
    }
    else{
      return createUrlTreeFromSnapshot(route, ['/dog']);
    }
  }
  return true;
};
