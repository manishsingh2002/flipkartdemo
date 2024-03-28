import { Component, Input, OnChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  @Input() filteredData: any;
  toggle = true;
  productdata: any[] = [];
  filteredProducts: any[] = [];
  togglecheckout = true;
  checkout = false;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        response.products.forEach((element: any) => {
          this.productdata.push(element);
        });
      }
    });
  }

  togglechckoutpage() {
    this.togglecheckout = !this.togglecheckout;
    this.checkout = !this.checkout;
    this.toggle = !this.toggle;
  }
  togglehomepage() {
    if (this.filteredProducts.length > 0) {
      this.toggle = false;
    }
  }

  resetsearch() {
    this.filteredProducts.length = 0;
    this.toggle = true;
  }

  filtering() {
    this.filteredProducts = this.productdata.filter((product: any) => {
      // let match = true;

      if (this.filteredData.categories.length > 0) {
        return this.filteredData.categories.includes(product.category);
      }

      if (this.filteredData.brands.length > 0) {
        return this.filteredData.brands.includes(product.brand);
      }

      if (this.filteredData.ratings.length > 0) {
        const minrating = this.filteredData.ratings[0];
        const maxrating = this.filteredData.ratings[1] || Infinity;
        return product.rating >= minrating && product.rating <= maxrating;
      }

      if (this.filteredData.prices.length > 0) {
        // Assuming filteredData.prices is an array of numbers representing min and max prices
        const minPrice = this.filteredData.prices[0];
        const maxPrice = this.filteredData.prices[1] || Infinity; // Handle single price or range
        return product.price >= minPrice && product.price <= maxPrice;
      }
    });
    console.log('Filtered Products:', this.filteredProducts);
    console.log('manish', this.filteredData);
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // add to cart section
  cartData: any[] = [];

  addTocart(product: any) {
    this.cartData.push(product);
    console.log(this.cartData);
  }
}
// }
// filtering() {
//   this.filteredProducts = this.productdata.filter((product: any) => {
//     if (this.filteredData.categories.length > 0) {
//       return this.filteredData.categories.includes(product.category);
//     }
//     if (this.filteredData.brands.length > 0) {
//       return this.filteredData.brands.includes(product.brand);
//     }

//     if (this.filteredData.ratings.length > 0) {
//       return this.filteredData.ratings >= product.rating;
//     }

//     if (this.filteredData.prices.length > 0) {
//       return this.filteredData.price.includes(
//         product.price > 0 && product.price <= this.filteredData.price
//       );
//     }
//   });
//   console.log('Filtered Products:', this.filteredProducts);
// }
