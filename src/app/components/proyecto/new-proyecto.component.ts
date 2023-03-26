import { Component, OnInit } from '@angular/core';
import { getDownloadURL, list, Storage } from '@angular/fire/storage';
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

  constructor(public sProyecto: ProyectosService, private router: Router, public imageService: ImageService, private storage: Storage) { }

  ngOnInit(): void {
    document.getElementById('imagen2').style.display = 'none';
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

  uploadImagen($event:any){
    document.getElementById('imagen').innerHTML = '<img width="50px" src="../../../assets/cargando.gif">';
    document.getElementById('imagen2').style.display = 'none';
    var n = 0;
    const name = "proyecto_" + n;
    this.sProyecto.uploadImagen($event, name, n);
    setTimeout(this.cambiarImagen,3500);
  }
  cambiarImagen(){
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('imagen2').style.display = 'block';
  }

}