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
      } else {
        console.log('Error fetching data or no products in response');
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
      console.log(
        'nehalllllllllllllllllllll',
        this.filteredData.category.length
      );
      if (this.filteredData.category.length > 0) {
        return this.filteredData.category.includes(product.category);
      }

      if (this.filteredData.brand.length > 0) {
        return this.filteredData.brand.includes(product.brand);
      }
      console.log('filtered data aaaaaaaaaaaa', this.filteredData); // Check if filteredData is populated here

      if (this.filteredData.rating.length > 0) {
        const minrating = this.filteredData.ratings[0];
        const maxrating = this.filteredData.ratings[1] || Infinity;
        return product.rating >= minrating && product.rating <= maxrating;
      }

      if (this.filteredData.price.length > 0) {
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
  // cartData: any[] = [];

  // addTocart(product: any) {
  //   this.cartData.push(product);
  //   console.log(this.cartData);
  // }
  // ///////////////////  //////////
  cartData: any[] = [];
  // Data: any[] = [];

  addTocart(product: any) {
    // console.log(product);
    // this.Data.push(product);
    product.forEach((ele: any) => {
      const updatedProduct = { ...ele, quantity: 0, final_price: 0 };
      this.cartData.push(updatedProduct);
    });
    console.log('this.cartData', this.cartData);
  }
}
