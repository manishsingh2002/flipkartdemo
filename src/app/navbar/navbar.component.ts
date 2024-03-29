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
  // basic categories storing data
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
  //
  togglecateegories = false;
  togglebrandings = false;
  toggleratings = false;
  togglepricings = false;
  productdata: any[] = [];
  selectedcategorybrands: any = [];
  // input data for child elements
  public filteredData: { [key: string]: string[] | number[] } = {
    category: this.selectedCategories,
    brand: this.selectedBrands,
    price: this.selectedPrices,
    rating: this.selectedRatings,
  };

  // toggling
  constructor(private dataService: DataService) {}

  // main filder where we are storing the categories names in the theeir array
  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        response.products.forEach((element: any) => {
          if (!this.category.includes(element.category)) {
            this.category.push(element.category);
            // console.log('cateegory', this.category);
          }
          if (!this.brand.includes(element.brand)) {
            this.brand.push(element.brand);

            // console.log('brand', this.brand);
          }
          if (!this.price.includes(element.price)) {
            this.price.push(element.price);
            // console.log('price', this.price);
          }
          if (!this.rating.includes(element.rating)) {
            this.rating.push(element.rating);
            // console.log('rating', this.rating);
          }
        });
      }
    });
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

  ////////////////////////  /////// //////////////////////////////////////////////////////////\

  onvalueChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    const isChecked = event.target.checked;
    //

    // console.log(value, 'manishdkjabdbwawd', name);
    if (isChecked) {
      if (name === 'categories') {
        this.selectedCategories.push(value);
      }
    } else {
      const index = this.selectedCategories.indexOf(value);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
      console.log('mmmmmmmmmmmmmmmmmmmmm', this.selectedCategories);
    }

    // for brand
    if (name === 'brand') {
      if (isChecked) {
        this.selectedBrands.push(value);
      }
    } else {
      const index = this.selectedBrands.indexOf(value);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
      console.log('filteredData', this.filteredData);
    }

    //
    // for pricce
    if (name === 'price') {
      if (isChecked) {
        this.selectedPrices.push(value);
      }
    } else {
      const index = this.selectedPrices.indexOf(value);
      if (index !== -1) {
        this.selectedPrices.splice(index, 1);
      }
      console.log('filteredData', this.filteredData);
    }

    //  ratinng
    if (name === 'rating') {
      if (isChecked) {
        this.selectedRatings.push(value);
      } else {
        const index = this.selectedRatings.indexOf(value);
        if (index !== -1) {
          this.selectedRatings.splice(index, 1);
        }
        console.log('filteredDatajqvdbwbqbdwdhid', this.filteredData);
      }
      // //
      // console.log('Selected prices:', name, this.selectedPrices);
      // console.log('seleccted categoris', this.selectedCategories);
      // console.log('seleccted rating', this.selectedRatings);
      // console.log('seleccted brand', this.selectedBrands);
    }
  }
}
