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
    this.dataService.getData().subscribe((response) => {
      this.data = response.products;
      console.log(',,,,,,,,,,,,,,,', this.data);

      if (response && response.products) {
        response.products.forEach((element: any) => {
          if (!this.category.includes(element.category)) {
            this.category.push(element.category);
          }

          if (!this.brand.includes(element.brand)) {
            //
            this.brand.push(element.brand);
          }
          if (!this.price.includes(element.price)) {
            this.price.push(element.price);
            // console.log('price', this.price);
          }
          if (!this.rating.includes(element.rating)) {
            this.rating.push(element.rating);
          }
        });
      }
    });
  }
  ///////////////////////////////////////////////////////////
  // brandchange() {
  //   this.data.forEach((element: any) => {
  //     // console.log('element.category', element.category);
  //     if (this.selectedCategories.includes(element.category)) {
  //       this.filteredcategory.push(element);
  //     }
  //     console.log('filteredcategory', this.filteredcategory);
  //   });
  //   // ???
  //   this.filteredcategory.forEach((element: any) => {
  //     this.filteredbrand.push(element.brand);
  //   });
  //   if (this.filteredbrand.length > 0) {
  //     this.filterbrand = true;
  //     this.unsortedbrand = false;
  //     // /////////////////////
  //   }

  //   console.log('filteredbrand', this.filteredbrand);
  //   this.productdata = this.filteredbrand;
  // }
  brandchange() {
    // Clear filteredcategory before iterating
    this.filteredcategory.length = 0; // Reset the array

    this.data.forEach((element: any) => {
      if (this.selectedCategories.includes(element.category)) {
        this.filteredcategory.push(element);
      }
    });

    console.log('filteredcategory', this.filteredcategory);

    // Update filteredbrand based on filteredcategory
    this.filteredbrand = []; // Reset the array
    this.filteredcategory.forEach((element: any) => {
      this.filteredbrand.push(element.brand);
    });

    // Update flags based on filteredbrand length
    this.filterbrand = this.filteredbrand.length > 0;
    this.unsortedbrand = !this.filterbrand;

    console.log('filteredbrand', this.filteredbrand);
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
    // console.log(value, 'manishdkjabdbwawd', name);
    if (isChecked) {
      if (name === 'categories') {
        this.selectedCategories.push(value);
        console.log('mmmmmmmmmmmmmmmmmmmmm', this.selectedCategories);
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
    }
  }
}
