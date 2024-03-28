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
  selectedCategories: string[] = [];
  selectedRatings: number[] = [];
  selectedBrands: string[] = [];
  selectedPrices: any = [];
  togglecateegories = false;
  togglebrandings = false;
  toggleratings = false;
  togglepricings = false;
  productdata: any[] = [];
  selectedcategorybrands: any = [];
  // input data for child elements
  public filtereddata: { [key: string]: any[] } = {
    categories: this.selectedCategories,
    brands: this.selectedBrands,
    prices: this.selectedPrices,
    ratings: this.selectedRatings,
  };
  // toggling

  //
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
    //
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        response.products.forEach((element: any) => {
          this.productdata.push(element);
        });
      }
    });
    //
  }
  ////////////////////////////////////////////////////////////////////////////////////
  togglecategory() {
    this.togglecateegories = !this.togglecateegories;
  }
  togglerating() {
    this.toggleratings = !this.toggleratings;
  }
  togglebrand() {
    this.togglebrandings = !this.togglebrandings;
  }
  toggleprice() {
    this.togglepricings = !this.togglepricings;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  onPriceChange(event: any) {
    const price = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedPrices.push(price);
    } else {
      const index = this.selectedPrices.indexOf(price);
      if (index !== -1) {
        this.selectedPrices.splice(index, 1);
      }
    }
    console.log('Selected prices:', this.selectedPrices);
    // console.log(this.filtereddata); // For debugging or logging
  }
  ////////////////////////////////////////////////////////////////////////////////
  oncategoryChange(event: any) {
    const category = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    console.log('seleccted categoris', this.selectedCategories); // For debugging or logging

    this.filtereddata['brand'] = this.productdata.filter((category: any) => {
      if (this.selectedCategories.length > 0) {
        return this.selectedCategories.includes(category.category);
      } else {
        return true;
      }
    });
  }

  //////////  //////////////////////////////////
  onratingChange(event: any) {
    const rating = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedRatings.push(rating);
    } else {
      const index = this.selectedRatings.indexOf(rating);
      if (index !== -1) {
        this.selectedRatings.splice(index, 1);
      }
    }
    // console.log(this.filtereddata); // For debugging or logging

    console.log('seleccted rating', this.selectedRatings); // For debugging or logging
  }
  ///////////////// //  /////////////////// /////////////////// //////////////////
  onbrandchange(event: any) {
    const brand = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    console.log('seleccted brand', this.selectedBrands);
    // console.log(this.filtereddata['brands']); // For debugging or logging
  }
}
