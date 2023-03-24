import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../model/proyectos';
import { getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  URL = environment.URL + 'proyectos/';
  urlP: string = "";

  constructor(private httpClient : HttpClient, private storage: Storage) { }

  public lista(): Observable<Proyectos[]>{
    return this.httpClient.get<Proyectos[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Proyectos>{
    return this.httpClient.get<Proyectos>(this.URL + `detail/${id}`);
  }

  public save(proyectos: Proyectos): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', proyectos);
  }

  public update(id: number, proyectos: Proyectos): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, proyectos);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }

  public uploadImagen($event: any, name: string){
    const file = $event.target.files[0]
    const imgRef = ref(this.storage, `proyectos/`+ name)
    uploadBytes(imgRef, file)
    .then(response => {this.getImages()})
    .catch(error => console.log(error))
  }

  getImages(){
    const imagesRef = ref(this.storage, 'proyectos')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.urlP = await getDownloadURL(item);
      }
      alert("Imagen subida")
    })
    .catch(error => console.log(error))
  }
}
