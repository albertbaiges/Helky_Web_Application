import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicinesCimaService {

  constructor(private http: HttpClient) { }

  private infoMapper() {
    return map((response: any) => {
      const {resultados} = response;
      let info: any= [];
      resultados.forEach((result: any) => {
        let obj = {
          nregistro: result.nregistro,
          name: result.nombre,
          box: result.fotos ? result.fotos[0].url : ""
        }
        info.push(obj);
      });
      return info;
    });
  }

  getByNRegistro(nregistro: string): Promise<any> {
    return this.http.get(`https://cima.aemps.es/cima/rest/medicamentos?nregistro=${nregistro}`)
      .pipe(
        this.infoMapper()
      )
      .toPromise();
  }

  //cn: codigo nacional
  getByNationalCode(cn: string): Promise<any> {
    return this.http.get(`https://cima.aemps.es/cima/rest/medicamentos?cn=${cn}`)
    .pipe(
      this.infoMapper()
    )
    .toPromise();
  }

  getByName(nombre: string): Promise<any> {
    return this.http.get(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${nombre}`)
    .pipe(
      this.infoMapper()
    )
    .toPromise();
  }
}
