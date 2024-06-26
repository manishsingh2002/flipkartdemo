import { Component, Input, OnChanges } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  @Input() filteredData: any;
  productdata: any[] = [];
  filteredProducts: any[] = [];
  ascending: any[] = [];
  descending: any[] = [];

  images: any[] | undefined;
  allImageLinks: any[] = [];
  constructor(private dataService: DataService) {
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

  ngOnInit() {
    this.displayimages();
    // Output: array containing all image links
  }

  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5,
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3,
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1,
  //   },
  // ];

  ///////////////////////////////////////////////////
  togglecheckout = true;
  checkout = false;
  toggle = true;

  togglechckoutpage() {
    this.togglecheckout = !this.togglecheckout;
    this.checkout = !this.checkout;
    this.toggle = !this.toggle;
  }

  displayimages() {
    this.allImageLinks.push(
      this.productdata.reduce((acc, product) => {
        // Acc = accumulator, product = current object in the loop
        return acc.concat(product.images || []); // Flatten arrays, include empty arrays
      }, [])
    );
    console.log(this.allImageLinks);
  }
  togglehomepage() {
    if (this.filteredProducts.length > 0) {
      this.toggle = false;
    } else {
      this.toggle = true;
    }

    this.checkout = false;
  }

  resetsearch() {
    // window.location.reload();

    this.filteredProducts.length = 0;
    this.toggle = true;
    this.displayimages();
    this.togglecheckout = true;
    this.checkout;
  }
  //
  filteringrating() {
    let filteredResult = [];

    if (this.filteredData.rating.length > 0) {
      filteredResult.push(
        ...this.productdata.filter((product: any) => {
          if (this.filteredData.rating == '4-5') {
            return this.filteredData.rating.includes(
              String(product.rating > 5)
            );
          }
        })
      );
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
    // console.log(this.filteredProducts);
  }

  // searchfiltering() {

  //   console.log(this.filteredProducts);
  // }

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
        // filteredResult;
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
    } else if (this.filteredData.search.length > 0) {
      // this.filteredData.category.length = 0;
      // this.filteredData.brand.length = 0;
      // this.filteredData.price.length = 0;
      //

      this.productdata.filter((product: any) => {
        if (
          this.filteredData.search[0]
            .toLowerCase()
            .includes(product.title.toLowerCase())
        ) {
          console.log('manish');
          filteredResult.push(product);
        }
        console.log(filteredResult);
      });
    }
    ///////////////
    else {
      filteredResult.push(...this.productdata);
    }

    this.filteredProducts = filteredResult;
  }
  cartData: any[] = [];

  addTocart(product: any) {
    const existingProduct = this.cartData.find(
      (item) => item.id === product.id
    );

    if (!existingProduct) {
      const updatedProduct = {
        ...product,
        quantity: 1,
        final_price: product.price || 0,
      };
      this.cartData.push(updatedProduct);
      console.log('Product added to cart:', updatedProduct);
    } else {
      alert('Product already exists in cart:');
    }
  }
}
