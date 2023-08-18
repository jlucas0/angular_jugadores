import { Component,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import {Jugador} from '../../modelos/jugador';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  @Input() jugadores:Jugador[] = [];
  columnas: string[] = ['nombre', 'dorsal', 'acciones'];
  
  @Output() indiceEditar = new EventEmitter<number>();
  @Output() indiceBorrar = new EventEmitter<number>();

  @ViewChild(MatTable) table!: MatTable<Jugador>;

  public seleccionar(indice:number):void{
    this.indiceEditar.emit(indice);
  }
  public borrar(indice:number):void{
    this.indiceBorrar.emit(indice);
  }

  public actualizarTabla():void{
    this.table.renderRows();
  }
}
