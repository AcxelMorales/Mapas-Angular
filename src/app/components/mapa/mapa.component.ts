import { Component } from '@angular/core';
import Marcador from 'src/app/classes/Marcador.class';
import { MapaService } from 'src/app/services/mapa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditarComponent } from './editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [`
  agm-map {
    height: calc(100vh - 11rem);
  }
  `]
})
export class MapaComponent {

  public marcadores: Marcador[];

  lat: number = 19.472898;
  lng: number = -99.208055;

  constructor(private _service: MapaService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.marcadores = this._service.getStorage();

    // Podemos poner el sitio actual si se desea
    // const marcador = new Marcador(19.472898, -99.208055);
    // this.marcadores.push(marcador);
  }

  addPin(evento): void {
    const marcador = new Marcador(evento.coords.lat, evento.coords.lng);
    this._service.addItem(marcador);
    this.snackBar.open('Marcador Agregado', 'Cerrar', {
      duration: 2000
    });
  }

  delete(idx): void {
    this._service.deleteItem(idx);
    this.snackBar.open('Marcador Eliminado', 'Cerrar', {
      duration: 2000
    });
  }

  openDialog(marcador: Marcador): void {
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this._service.saveStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', {
        duration: 2000
      });
    });
  }

}
