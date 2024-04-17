import { Component } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-deliver-page',
  templateUrl: './deliver-page.component.html',
  styleUrl: './deliver-page.component.css',
})
export class DeliverPageComponent {
  userdaata: any;
  finalPricetoPaid: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userdaata = this.dataService.setUserInfo();
    this.finalPricetoPaid = this.dataService.setfinalprice();
  }
}
