import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public data: any;
  public category: any[] = [];
  public brand: any[] = [];
  public price: any[] = [];
  public rating: any[] = [];

  selectedCategory: any[] = [];
  selectedRating: any[] = [];
  selectedBrand: any[] = [];
  selectedPrice: number = 0;

  filteredData: any[] = [];

  @Output() filteredDataEvent = new EventEmitter<any>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        response.products.forEach((element: any) => {
          if (!this.category.includes(element.category)) {
            this.category.push(element.category);
          }
          if (!this.brand.includes(element.brand)) {
            this.brand.push(element.brand);
          }
          if (!this.price.includes(element.price)) {
            this.price.push(element.price);
          }
          if (!this.rating.includes(element.rating)) {
            this.rating.push(element.rating);
          }
        });
      }
    });
  }

  OnChanges() {
    this.filteredData.push({
      category: this.selectedCategory,
      rating: this.selectedRating,
      brand: this.selectedBrand,
      price: this.selectedPrice,
    });

    this.filteredDataEvent.emit(this.filteredData);
  }
}
