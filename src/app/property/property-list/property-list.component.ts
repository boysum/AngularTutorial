import { IProperty } from './../IProperty.interface.ts';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  Properties: Array<IProperty> = [];



  constructor(private housingService:HousingService) { }

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      data=>{
            this.Properties = data;
            console.log(data)
          }, error =>{
            console.log(error);
          }
    )
  }

}
