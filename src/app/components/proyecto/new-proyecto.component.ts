import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/service/image.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-new-proyecto',
  templateUrl: './new-proyecto.component.html',
  styleUrls: ['./new-proyecto.component.css']
})
export class NewProyectoComponent implements OnInit {
  nombreP: string = '';
  descripcionP: string = '';
  imgP: string = '';
  enlaceP: string = '';
  public archivos: any = []

  constructor(private sProyecto: ProyectosService, private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const proy = new Proyectos(this.nombreP, this.descripcionP, this.imgP, this.enlaceP);
    // this.imgP = this.imageService.url
    this.sProyecto.save(proy).subscribe(
      data => {
        alert("Proyecto añadido");
        this.router.navigate(['']);
      }, err => {
        alert("Falló");
        this.router.navigate(['']);
      }
    )
  }

  // uploadImage($event:any){
  //   const name = "proyecto_" + this.nombreP;
  //   this.imageService.uploadImage($event, name)
  // }

}