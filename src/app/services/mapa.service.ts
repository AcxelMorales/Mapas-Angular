import { Injectable } from '@angular/core';
import Marcador from '../classes/Marcador.class';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  lista: Marcador[] = [];

  constructor() {
    this.getStorage();
  }

  saveStorage(): void {
    localStorage.setItem('data', JSON.stringify(this.lista));
  }

  getStorage(): Marcador[] {
    if (localStorage.getItem('data')) {
      return this.lista = JSON.parse(localStorage.getItem('data'));
    } else {
      return this.lista = [];
    }
  }

  addItem(marcador: Marcador): void {
    this.lista.push(marcador);
    this.saveStorage();
  }

  deleteItem(idx): void {
    this.lista.splice(idx, 1);
    this.saveStorage();
  }

}
