import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  user: any;
  userInfo: any;
  names = [
    'ALAAHO',
    'RAGHEEDS',
    'KANARS',
    'YAZANGHA',
    'RITASH',
    'REHABT',
    'HANANT',
    'OLAMHD',
    'SAMIRK',
    'AMRD',
    'SHADIAHR',
    'RITASH',
    'NADAH',
    'U9C84G\\MIS',
    'SALEEMK',
    'MHDISM',
  ];
  constructor(private service: UserService, private route: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<any | UrlTree>
    | Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.service.GetMyUser().subscribe((x) => {
        this.user = x;

        if (this.names.find((x) => x == this.user.toUpperCase())) resolve(true);
        else {
          resolve(false);
          this.route.navigate(['admin/notAuth']);
        }
      });
    });
  }
}
