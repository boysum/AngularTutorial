import { IProperty } from '../IProperty.interface';
import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-property-card',
  //template: `<h1>i am a card</h1>`,
  templateUrl: 'property-card.component.html',
  //styles: ['h1 {font-weight:normal;}']
  styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent {
  @Input() property: IProperty = {
    Name: "",
    SellRent: 1,
    Id: 0,
    Type: "",
    Price: 0
  };


}
