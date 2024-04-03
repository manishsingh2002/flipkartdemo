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
  public data: any[] = [];
  public category: any[] = [];
  public brand: any[] = [];
  public price: any[] = [];
  public rating: any[] = [];
  //
  // selectedd filtered out data after searching for a category
  selectedCategories: string[] = [];
  selectedRatings: number[] = [];
  selectedBrands: string[] = [];
  selectedPrices: any = [];
  //
  filteredbrand: any[] = [];
  filteredcategory: any[] = [];
  filterbrand = false;
  unsortedbrand = true;
  //
  togglecateegories = false;
  togglebrandings = false;
  toggleratings = false;
  togglepricings = false;
  productdata: any[] = [];
  selectedcategorybrands: any = [];
  // input data for child elements
  //
  public filteredData: { [key: string]: string[] | number[] } = {
    category: this.selectedCategories,
    brand: this.selectedBrands,
    price: this.selectedPrices,
    rating: this.selectedRatings,
  };
  //
  // toggling
  constructor(private dataService: DataService) {}

  // main filder where we are storing the categories names in the theeir array
  ngOnInit() {
    this.price.push('LowToHigh', 'HighToLow');
    this.rating.push('0-1🌟', '1-3🌟', '3-4🌟', '4-5🌟');

    this.dataService.getData().subscribe((response) => {
      this.data = response.products;
      if (response && response.products) {
        response.products.forEach((element: any) => {
          if (!this.category.includes(element.category)) {
            this.category.push(element.category);
          }

          if (!this.brand.includes(element.brand)) {
            this.brand.push(element.brand);
          }
          // if (!this.price.includes(element.price)) {
          //   this.price.push('lowtohigh', 'hightolow');
          // }
          // if (!this.rating.includes(element.rating)) {
          //   this.rating.push(element.rating);
          // }
        });
      }
    });
  }
  ///////////////////////////////////////////////////////////////////////////////\
  //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/
  // brandchange() {
  //   this.filteredcategory.length = 0;
  //   this.data.forEach((element: any) => {
  //     if (this.selectedCategories.includes(element.category)) {
  //       this.filteredcategory.push(element);
  //     }
  //   });
  //   console.log('filteredcategory', this.filteredcategory);
  //   this.filteredbrand = [];
  //   this.filteredcategory.forEach((element: any) => {
  //     this.filteredbrand.push(element.brand);
  //   });

  //   // Update flags based on filteredbrand length
  //   this.filterbrand = this.filteredbrand.length > 0;
  //   this.unsortedbrand = !this.filterbrand;

  //   console.log('filteredbrand', this.filteredbrand);
  //   this.productdata = this.filteredbrand;
  // }
  brandchange() {
    this.filteredcategory = this.data.filter((product) =>
      this.selectedCategories.includes(product.category)
    );

    // Get unique brands from filtered category
    this.filteredbrand = Array.from(
      new Set(this.filteredcategory.map((product) => product.brand))
    );

    // Update flags based on filteredbrand length
    this.filterbrand = this.filteredbrand.length > 0;
    this.unsortedbrand = !this.filterbrand;

    // Update productdata for displaying filtered brands
    this.productdata = this.filteredbrand;
  }

  ///////
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////\

  onvalueChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    const isChecked = event.target.checked;
    console.log(isChecked);

    if (isChecked) {
      // this.selectedCategories.length = 0;
      if (name === 'categories') {
        this.selectedCategories.push(value);
      }
    } else {
      const index = this.selectedCategories.indexOf(value);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
        // console.log('this.selectedCategories', this.selectedCategories);
      }
    }

    // for brand
    if (isChecked) {
      // this.selectedBrands.length = 0;
      if (name === 'brand') {
        this.selectedBrands.push(value);
      }
    } else {
      const index = this.selectedBrands.indexOf(value);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
        console.log(this.selectedBrands);
      }
    }

    if (isChecked) {
      this.selectedPrices.length = 0;
      if (name === 'price') {
        this.selectedPrices.push(value);
      }
    } else {
      const index = this.selectedPrices.indexOf(value);
      if (index !== -1) {
        this.selectedPrices.splice(index, 1);
        // console.log('sekected price', this.selectedPrices);
      }
      // console.log('filteredData', this.filteredData);
    }

    //  ratinng
    if (isChecked) {
      if (name === 'rating') {
        this.selectedRatings.push(value);
      }
      // console.log('object', this.selectedRatings);
    } else {
      const index = this.selectedRatings.indexOf(value);
      if (index !== -1) {
        this.selectedRatings.splice(index, 1);
      }
    }
    console.log('filteredDatajqvdbwbqbdwdhidmmmmmmmmmmmmm', this.filteredData);
  }
}
