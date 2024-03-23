import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  showAppLogin = false;

  constructor() { }

  toggleAppLoginDisplay() {
    this.showAppLogin = !this.showAppLogin;
  }
}
