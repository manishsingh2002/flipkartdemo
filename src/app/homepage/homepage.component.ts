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
  filteredproductwithbrand: any[] = [];
  togglecheckout = true;
  checkout = false;
  ascending: any[] = [];
  descending: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        this.productdata = response.products;

        // Create copies for sorting without modifying original data
        const ascendingData = this.productdata.slice();
        const descendingData = this.productdata.slice();

        // Sort data in ascending and descending order
        ascendingData.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return priceA - priceB; // Ascending order (lowest to highest)
        });

        descendingData.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);
          return priceB - priceA; // Descending order (highest to lowest)
        });

        this.ascending = ascendingData;
        this.descending = descendingData;
        // Example: Initially show ascending

        console.log('Original data:', this.productdata);
        console.log('Sorted data (ascending):', this.ascending);
        console.log('Sorted data (descending):', this.descending);
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
    if (this.filteredProducts.length == 0) {
      this.toggle = true;
    }
  }

  resetsearch() {
    this.filteredProducts.length = 0;
    this.toggle = true;
  }

  filtering() {
    if (
      this.filteredData.price.length > 0 &&
      this.filteredData.price[0] === 'LowToHigh'
    ) {
      this.filteredProducts = this.ascending;
    } else if (
      this.filteredData.price.length > 0 &&
      this.filteredData.price[0] === 'HighToLow'
    ) {
      this.filteredProducts = this.ascending;
    } else {
      this.filteredProducts = this.productdata.filter((product: any) => {
        if (
          this.filteredData.category.length > 0 &&
          this.filteredData.brand.length > 0
        ) {
          return (
            this.filteredData.category.includes(product.category) &&
            this.filteredData.brand.includes(product.brand)
          );
        } else {
          this.filteredProducts.length = 0;
        }

        if (this.filteredData.brand.length > 0) {
          return this.filteredData.brand.includes(product.brand);
        } else {
          this.filteredProducts.length = 0;
        }

        if (this.filteredData.category.length > 0) {
          return this.filteredData.category.includes(product.category);
        } else {
          this.filteredProducts.length = 0;
        }
      });
    }
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  cartData: any[] = [];

  addTocart(product: any) {
    product.forEach((ele: any) => {
      const updatedProduct = { ...ele, quantity: 0, final_price: 0 };
      this.cartData.push(updatedProduct);
    });
    console.log('this.cartData', this.cartData);
  }
}
