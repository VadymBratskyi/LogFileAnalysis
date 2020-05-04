import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProcessLogFilesService } from '@log_services';

@Injectable({
  providedIn: 'root'
})
export class CreateSessionGuard implements CanActivate {

  constructor(
    private serviceProcessLogFile: ProcessLogFilesService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
