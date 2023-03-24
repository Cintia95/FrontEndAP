import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/model/proyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit{
  proyectos: Proyectos[] = [];

  constructor(private sProyectos: ProyectosService, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyectos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyectos(): void{
    this.sProyectos.lista().subscribe(
      data =>{
        this.proyectos = data;
      }
    )
  }

  delete(id?: number){
    var resp = confirm("¿Está seguro que desea eliminar este proyecto?")
    if( id != undefined && resp){
      this.sProyectos.delete(id).subscribe(
        data => {
          alert("Eliminado correctamente");
          this.cargarProyectos();
        }, err => {
          alert("No se pudo eliminar");
        }
      )
    }
  }
}
