import { Component, Input, OnChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  @Input() filteredData: any;
  toggle = true;
  productdata: any[] = [];
  filteredProducts: any[] = [];
  ascending: any[] = [];
  descending: any[] = [];
  togglecheckout = true;
  checkout = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      if (response && response.products) {
        this.productdata = response.products;

        const ascendingData = this.productdata.slice();
        const descendingData = this.productdata.slice();

        this.ascending = ascendingData.sort((a, b) => {
          return a.price - b.price;
        });

        this.descending = descendingData.sort((a, b) => {
          return b.price - a.price;
        });

        console.log('Original data:', this.productdata);
        console.log('Sorted data (ascending):', this.ascending);
        console.log('Sorted data (descending):', this.descending);
      } else {
        console.log('Error fetching data or no products in response');
      }
    });
  }
  ///////////////////////////////////////////////////
  togglechckoutpage() {
    this.togglecheckout = !this.togglecheckout;
    this.checkout = !this.checkout;
    this.toggle = !this.toggle;
  }

  togglehomepage() {
    if (this.filteredProducts.length > 0) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }
  }

  resetsearch() {
    this.filteredProducts.length = 0;
    this.toggle = true;
  }
  //
  filteringrating() {
    if (this.filteredData.rating.length > 0) {
      let filteredResult = this.productdata.filter((product: any) => {
        return this.filteredData.rating.includes(String(product.rating));
      });
      this.filteredProducts = filteredResult;
    }
  }

  sortingprices() {
    if (this.filteredData.price.length > 0) {
      let filteredResult = this.productdata.filter((product: any) => {
        return (
          (this.filteredData.category.length === 0 ||
            this.filteredData.category.includes(product.category)) &&
          (this.filteredData.brand.length === 0 ||
            this.filteredData.brand.includes(product.brand))
        );
      });

      if (this.filteredData.price[0] === 'LowToHigh') {
        filteredResult.sort((a, b) => a.price - b.price);
      } else if (this.filteredData.price[0] === 'HighToLow') {
        filteredResult.sort((a, b) => b.price - a.price);
      }
      this.filteredProducts = filteredResult;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  filtering() {
    let filteredResult: any[] = [];
    if (
      this.filteredData.category.length > 0 &&
      this.filteredData.brand.length > 0
    ) {
      filteredResult.push(
        ...this.productdata.filter((product: any) => {
          return (
            this.filteredData.category.includes(product.category) &&
            this.filteredData.brand.includes(product.brand)
          );
        })
      );

      if (this.filteredData.price[0] === 'LowToHigh') {
        filteredResult.sort((a, b) => a.price - b.price);
      } else if (this.filteredData.price[0] === 'HighToLow') {
        filteredResult.sort((a, b) => b.price - a.price);
      } else {
        filteredResult;
      }
    } else if (this.filteredData.brand.length > 0) {
      filteredResult.push(
        ...this.productdata.filter((product: any) => {
          return this.filteredData.brand.includes(product.brand);
        })
      );
    } else if (this.filteredData.category.length > 0) {
      // Filter based on category
      filteredResult.push(
        ...this.productdata.filter((product: any) => {
          return this.filteredData.category.includes(product.category);
        })
      );
    } else {
      filteredResult.push(...this.productdata);
    }
    this.filteredProducts = filteredResult;
  }
  cartData: any[] = [];
  addTocart(product: any) {
    product.forEach((ele: any) => {
      const updatedProduct = { ...ele, quantity: 1, final_price: 0 };
      this.cartData.push(updatedProduct);
    });
    console.log('this.cartData', this.cartData);
  }
  removeFromCart(index: number) {
    this.cartData.splice(index, 1);
    console.log('this.cartData', this.cartData);
  }
}
