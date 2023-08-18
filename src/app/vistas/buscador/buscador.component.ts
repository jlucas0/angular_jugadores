import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  
  public filtro = "";

  @Output() filtroOut = new EventEmitter<string>();

  public filtrar():void{
    this.filtroOut.emit(this.filtro);
  }
}
