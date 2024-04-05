import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  @Input() cart: any;
  images: string[] = [];
  selectedImages: string[] = []; // Array to store selected images

  // carts: any[] = [];
  quantity = 0;
  finalprice = 0;
  constructor() {}
  responsiveOptions: any[] | undefined;
  //////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.cart.forEach((img: any) =>
      img.images.forEach((img: any) => this.images.push(img))
    );
    console.log(this.images);

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }
  ///////////////////////////////////////////////////
  remove(event: any) {
    this.cart.forEach((ele: any) => {
      if (ele.quantity === 0) {
        if (ele.id === event.id) {
          console.log('ele', ele);
          this.cart.splice(this.cart.indexOf(ele), 1);
        }
      }
    });
  }
  //////////////////////////////////////////
  counteradd(event: any) {
    this.quantity = this.quantity + 1;
    event.quantity = this.quantity;
    console.log(this.cart, 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
    event.finalprice = event.price * this.quantity;
    const discount = event.finalprice * (event.discountPercentage / 100);
    event.final_price = event.finalprice - discount;
  }

  countersub(event: any) {
    if (this.quantity > 0) this.quantity = this.quantity - 1;
    event.quantity = this.quantity;
    console.log(this.cart, 'mmmmmmmmmmmmmmmmmmmmmmmmmm');
    event.finalprice = event.price * this.quantity;
    const discount = event.finalprice * (event.discountPercentage / 100);
    event.final_price = event.finalprice - discount;
  }
}
