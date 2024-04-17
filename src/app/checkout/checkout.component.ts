import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  images: string[] = [];
  finalPrice: number = 0;
  selectedImages: string[] = []; // Array to store selected images
  quantity = 0;
  finalprice = 0;
  cart: any[] = [];

  responsiveOptions: any[] | undefined;
  toggleproduct = true;
  togglecheckoutproduct = false;
  //
  constructor(private dataServie: DataService) {}
  //////////////////////////////////////////////////////////
  ngOnInit() {
    this.cart = this.dataServie.getcart();
    console.log('checkout', this.cart);
  }
  ///////////////////////////////////////////////////
  remove(product: any) {
    this.cart.forEach((ele: any) => {
      if (ele.quantity === 0) {
        if (ele.id === product.id) {
          console.log('ele', ele);
          this.cart.splice(this.cart.indexOf(ele), 1);
        }
      }
    });
  }
  //////////////////////////////////////////
  counteradd(product: any) {
    this.quantity = this.quantity + 1;
    product.quantity = this.quantity;
    // console.log(this.cart, 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
    product.finalprice = product.price * this.quantity;
    const discount = product.finalprice * (product.discountPercentage / 100);
    product.final_price = product.finalprice - discount;
    // console.log(this.cart, 'mmmmmmmmmmmmmm;;;;;;;;;;mmmmmmmmmmmm');
    this.product();
  }
  // ////////////////////////////////////////////////////
  countersub(product: any) {
    if (this.quantity > 0) this.quantity = this.quantity - 1;
    product.quantity = this.quantity;
    product.finalprice = product.price * this.quantity;
    const discount = product.finalprice * (product.discountPercentage / 100);
    product.final_price = product.finalprice - discount;
    console.log(this.cart);
    this.product();
  }
  // //////////////////////////////////////////////////
  togglefinalcheckout(): void {
    this.toggleproduct = !this.toggleproduct;
    this.togglecheckoutproduct = !this.togglecheckoutproduct;
  }
  toggleuserinputform = false;
  toggleuserdetailform(): void {
    this.togglecheckoutproduct = !this.togglecheckoutproduct;
    this.toggleuserinputform = !this.toggleuserinputform;
  }
  // /////////////////////////////////////////////////
  product() {
    // this.cart.forEach((product: any) => {
    //   this.products = this.cart;
    //   console.log(this.products, 'kkkkkkkkkkk');
    // });
    this.products = this.cart;
    this.finalPrice = 0;

    this.products.forEach((product: any) => {
      console.log(product);
      this.finalPrice = this.finalPrice + product.final_price;
    });
    this.dataServie.finalcheckout(this.products, this.finalPrice);
  }
}
