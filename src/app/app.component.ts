import { Component,ViewChild } from '@angular/core';
import { Jugador } from './modelos/jugador';
import { ListadoComponent } from './vistas/listado/listado.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_equipos';
  public jugadores: Jugador[] = [
    {"id":1,"nombre":"Primero Uno","dorsal":1},
    {"id":2,"nombre":"Segundo Dos","dorsal":2},
    {"id":3,"nombre":"Tercero Tres","dorsal":3}
  ];
  public jugadoresFiltrado: Jugador[];
  public indiceSeleccionado = -1;
  private filtro = "";
  @ViewChild(ListadoComponent) listado!:ListadoComponent;

  constructor(){
    this.jugadoresFiltrado = this.jugadores;
  }

  filtrar(filtro:string){
    this.filtro = filtro.toLowerCase();
    this.actualizarDatosFiltrados();
  }
  agregar(jugador:Jugador){
    this.jugadores.push(jugador);
    this.actualizarDatosFiltrados();
  }
  editar(indice:number){
    for(let i = 0; i < this.jugadores.length; i++){
      if(this.jugadores[i].id == indice){
        this.indiceSeleccionado = i;
        break;
      }
    }
  }
  borrar(indice:number){
    if(confirm("¿Borrar?")){
      for(let i = 0; i < this.jugadores.length; i++){
        if(this.jugadores[i].id == indice){
          this.jugadores.splice(i,1);
          this.actualizarDatosFiltrados();
          break;
        }
      }
    }
  }

  private actualizarDatosFiltrados(){
    if(this.filtro){
      console.log("Filtrando por "+this.filtro);
      this.jugadoresFiltrado = [];
      for(let jugador of this.jugadores){
        if(jugador.nombre.toLowerCase().includes(this.filtro) || jugador.dorsal.toString().includes(this.filtro)){
          this.jugadoresFiltrado.push(jugador);
        }
      }
      console.log(this.jugadoresFiltrado);
    }else{
      console.log("Filtro restablecido");
      this.jugadoresFiltrado = this.jugadores;
    }
    this.listado.actualizarTabla();
  }
}
