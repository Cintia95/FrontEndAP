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

  constructor(private sProyecto: ProyectosService, private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService) { }

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
    alert("Espere un momento a que se suba la imagen");
    const id = this.activatedRouter.snapshot.params['id'];
    const name = "proyecto_" + id;
    this.sProyecto.uploadImagen($event, name)
  }

  

}
