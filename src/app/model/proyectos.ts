export class Proyectos {
    id? : number;
    nombreP : string;
    descripcionP : string;
    imgP : string;
    enlaceP : string;

    constructor(nombreP: string, descripcionP: string, imgP: string, enlaceP: string){
        this.nombreP = nombreP;
        this.descripcionP = descripcionP;
        this.imgP = imgP;
        this.enlaceP = enlaceP;
    }
}
