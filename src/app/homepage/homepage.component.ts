import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  productdata: any[] = [];
  constructor(private dataService: DataService) {}
  @Input() updatedvallue: any;
  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        response.products.forEach((element: any) => {
          // console.log(element);
          this.productdata.push(element);
        });
      }
    });
  }
}
