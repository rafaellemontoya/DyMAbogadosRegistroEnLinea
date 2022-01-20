import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getNoImpresora() {

    return localStorage.getItem('noImpresora');
  }
}
