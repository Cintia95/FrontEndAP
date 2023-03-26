import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit{
  proyecto: Proyectos = null;

  constructor(public sProyecto: ProyectosService, private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sProyecto.detail(id).subscribe(
      data =>{
        this.proyecto = data;
      }, err =>{
        alert("Error al modificar proyecto");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyecto.imgP = this.sProyecto.urlP
    this.sProyecto.update(id, this.proyecto).subscribe(
      data =>{
        alert("Actualizado correctamente");
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['']);
      }
    )
  }

  uploadImagen($event:any){
    document.getElementById('imagen').innerHTML = '<img width="50px" src="../../../assets/cargando.gif">';
    document.getElementById('imagen2').style.display = 'none';
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.sProyecto.uploadImagen($event, name, id);
    setTimeout(this.cambiarImagen,2500);
  }
  cambiarImagen(){
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('imagen2').style.display = 'block';
  }

  

}
