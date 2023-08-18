import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import {Jugador} from '../../modelos/jugador';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnChanges {

  public jugador = "";
  public dorsal = "";

  @Input() jugadores:Jugador[] = [];  
  @Input() seleccionado !: number; 
  @Output() seleccionadoChange = new EventEmitter<number>();
  @Output() agregado = new EventEmitter<Jugador>();

  ngOnChanges(changes: SimpleChanges){
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = chng.currentValue;
      if(propName == "seleccionado" && cur >=0){
        this.jugador = this.jugadores[cur].nombre;
        this.dorsal = this.jugadores[cur].dorsal.toString();
      }
    }
  }

  public guardar():void{
    if(this.jugador && this.dorsal){
      if(this.seleccionado>=0){
        this.jugadores[this.seleccionado].nombre = this.jugador;
        this.jugadores[this.seleccionado].dorsal = parseInt(this.dorsal);
        this.seleccionadoChange.emit(-1);
      }else{
        let id = this.jugadores[this.jugadores.length-1].id + 1;
        this.agregado.emit({"id":id,"nombre":this.jugador,"dorsal":parseInt(this.dorsal)});
      }
      this.jugador = "";
      this.dorsal = "";    
    }
  }

   public quitar():void{
    this.jugador = "";
    this.dorsal = "";  
    this.seleccionadoChange.emit(-1);
   }
}
