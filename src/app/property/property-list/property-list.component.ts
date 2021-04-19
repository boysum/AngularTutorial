import { IProperty } from '../IProperty.interface';
import { HousingService } from './../../services/housing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  SellRent : number = 1;
  Properties: IProperty[] = [];



  constructor(private route: ActivatedRoute, private housingService:HousingService) { }

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>{
            this.Properties = data;
            console.log(data);
            console.log(this.route.snapshot.url.toString());
          }, error =>{
            console.log(error);
          }
    )
  }

}
