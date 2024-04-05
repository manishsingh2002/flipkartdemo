import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  public data: any[] = [];
  public category: any[] = [];
  public brand: any[] = [];
  public price: any[] = [];
  public rating: any[] = [];
  public search: any[] = [];

  // //
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

  selectedCategories: string[] = [];
  selectedRatings: number[] = [];
  selectedBrands: string[] = [];
  selectedPrices: any = [];
  searchedvalue: string = ''; // Initialize with an empty string
  filteredData: { [key: string]: string | string[] | number[] } = {
    category: [], // Initialize the 'category' key with an empty array
    brand: [],
    price: [],
    rating: [],
    search: [],
  };

  // Function to update filteredData when selections change

  //
  //
  //
  // /
  //
  //
  constructor(private dataService: DataService) {}

  ngOnChanges(selectedCategories: any): void {
    console.log(selectedCategories);
  }
  // main filder where we are storing the categories names in the theeir array
  ngOnInit() {
    this.price.push('LowToHigh', 'HighToLow');
    this.rating.push('0-1', '1-3', '3-4', '4-5');
    console.log(this.searchedvalue);
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
        });
      }
    });
  }
  ///////////////////////////////////////////////////////////////////////////////\
  updateFilteredDatacategory() {
    this.filteredData['category'] = this.selectedCategories.slice(); // Create a copy
  }
  updateFilteredDatabrand() {
    this.filteredData['brand'] = this.selectedcategorybrands.slice(); // Create a copy
  }
  updateFilteredDatarating() {
    this.filteredData['rating'] = this.selectedRatings.slice(); // Create a copy
  }
  updateFilteredDataprice() {
    this.filteredData['price'] = this.selectedPrices.slice(); // Create a copy
  }
  updateSearch() {
    this.filteredData['search'] = this.searchedvalue.slice();
  }

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
  //
  //   updateFilteredData() {
  //     this.filteredData = {
  //       category: this.selectedCategories.slice(),
  //       brand: this.selectedcategorybrands.slice(),
  //       price: this.selectedPrices.slice(),
  //       rating: this.selectedRatings.slice(),
  //       search: [this.searchedvalue], // Update with current search term
  //     };
  //   }
  //   //
  onSearchChange(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchedvalue = searchTerm; // Update search term
    // this.updateFilteredData(); // Update filteredData with search term
    this.filteredData['search'] = [this.searchedvalue];
  }
  // }
}
///////
////////////////////////////////////////////////////////////////////////////////////
//   togglecategory() {
//     this.togglecateegories = !this.togglecateegories;
//   }
//   togglerating() {
//     this.toggleratings = !this.toggleratings;
//   }
//   togglebrand() {
//     this.togglebrandings = !this.togglebrandings;
//   }
//   toggleprice() {
//     this.togglepricings = !this.togglepricings;
//     console.log(this.selectedCategories);
//   }

//   // push() {
//   //   let filteredDatas: { [key: string]: string[] | number[] } = {
//   //     category: this.selectedCategories,
//   //     brand: this.selectedBrands,
//   //     price: this.selectedPrices,
//   //     rating: this.selectedRatings,
//   //   };

//   //   console.log(filteredDatas);
//   // }
//   ///////////////////////////////////////////////////////////////////////////////////////////////////////\

//   onvalueChange(event: any) {
//     console.log(this.selectedCategories);
//     const name = event.target.name;
//     const value = event.target.value;
//     const isChecked = event.target.checked;
//     console.log(isChecked);

//     if (isChecked) {
//       // this.selectedCategories.length = 0;
//       if (name === 'categories') {
//         this.selectedCategories.push(value);
//       }
//     } else {
//       const index = this.selectedCategories.indexOf(value);
//       if (index !== -1) {
//         this.selectedCategories.splice(index, 1);
//         // console.log('this.selectedCategories', this.selectedCategories);
//       }
//     }

//     // for brand
//     if (isChecked) {
//       // this.selectedBrands.length = 0;
//       if (name === 'brand') {
//         this.selectedBrands.push(value);
//       }
//     } else {
//       // this.selectedBrands.length = 0;

//       const index = this.selectedBrands.indexOf(value);
//       if (index !== -1) {
//         this.selectedBrands.splice(index, 1);
//         console.log(this.selectedBrands);
//       }
//     }

//     if (isChecked) {
//       if (name === 'price') {
//         this.selectedPrices.push(value);
//       }
//     } else {
//       const index = this.selectedPrices.indexOf(value);
//       if (index !== -1) {
//         this.selectedPrices.splice(index, 1);
//         // console.log('sekected price', this.selectedPrices);
//       }
//       // console.log('filteredData', this.filteredData);
//     }

//     //  ratinng
//     if (isChecked) {
//       if (name === 'rating') {
//         this.selectedRatings.push(value);
//       }
//       // console.log('object', this.selectedRatings);
//     } else {
//       const index = this.selectedRatings.indexOf(value);
//       if (index !== -1) {
//         this.selectedRatings.splice(index, 1);
//       }
//     }
//     console.log('filteredDatajqvdbwbqbdwdhidmmmmmmmmmmmmm', this.filteredData);
//   }
// }
