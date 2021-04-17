import { IProperty } from './../property/IProperty.interface.ts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

constructor(private http:HttpClient) { }

  getAllProperties():Observable<IProperty[]>{
    return this.http.get<Array<IProperty>>('data/properties.json').pipe(
      map(data =>{
        const propertiesArray: Array<IProperty> = [];
        for(const id in data){
          if(data.hasOwnProperty(id))
          {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }
}